import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import SystemRole from '@/models/system-role'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: any): Promise<any> {
                const { email, password } = credentials
                await dbConnect()

                try {
                    const user = await SystemRole.findOne({ email }).exec()
                    // console.log(user) //todo: remove this line after testing
                    if (!user) {
                        throw new Error("No user found with this email")
                    }

                    const isPasswordCorrect = await bcrypt.compare(password, user.password)
                    if (isPasswordCorrect) {
                        // Convert Mongoose document to plain JavaScript object
                        const plainUser = user.toObject()
                        return {
                            ...plainUser,
                            id: plainUser._id?.toString(), // Ensure id is a string
                            name: plainUser.name,
                            lastname: plainUser.lastname,
                            email: plainUser.email,
                            role: plainUser.role || 'Admin',
                        }
                    } else {
                        throw new Error('Incorrect Password')
                    }
                } catch (error: any) {
                    throw new Error(error.message || 'Authorization failed')
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString()
                token.name = user.name
                token.lastname = user.lastname

                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                _id: token._id,
                name: token.name,
                lastname: token.lastname,
                role: token.role,
            }
            return session
        }
    },
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/sign-in'
    },
}
