import { DefaultSession, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import SystemRole from '@/models/system-role'
import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                const { email, password } = credentials;
                await dbConnect();

                try {
                    const user = await SystemRole.findOne({ email }).exec();
                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    const isPasswordCorrect = await bcrypt.compare(password, user.password);
                    if (isPasswordCorrect) {
                        const plainUser = user.toObject();
                        return {
                            ...plainUser,
                            id: plainUser._id?.toString(),
                            name: plainUser.name,
                            lastname: plainUser.lastname,
                            email: plainUser.email,
                            role: plainUser.role || 'Admin',
                        };
                    } else {
                        throw new Error('Incorrect Password');
                    }
                } catch (error: any) {
                    throw new Error(error.message || 'Authorization failed');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.name = user.name;
                token.lastname = user.lastname;
                token.role = user.role;

                // Set token expiry to 30 seconds from now
                const expiresIn:number = 60*60*1; // 30 seconds
                token.exp = Math.floor(Date.now() / 1000) + expiresIn;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }): Promise<Session | DefaultSession> {
            // Check if token has expired
            const currentTime = Math.floor(Date.now() / 1000);
            if (currentTime > Number(token.exp)) {
                // Add a flag to indicate the session has expired
                // return null;
                session.expires = currentTime.toString();
                return session;
            } else {
                // Add session details if valid
                session.user = {
                    ...session.user,
                    _id: token._id,
                    name: token.name,
                    lastname: token.lastname,
                    role: token.role,
                };
            }
            return session;
        }
    },
    secret: process.env.JWT_SECRET,
    jwt: {
        maxAge: 60*60*1,
    },
    session: {
        strategy: 'jwt',
        maxAge: 60*60*1,
    },
    pages: {
        signIn: '/sign-in',
    },
}
