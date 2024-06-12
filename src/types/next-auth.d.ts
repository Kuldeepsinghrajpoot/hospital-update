import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface User {
        _id?: string,
        role:string,
        name?:string
        lastname?:string
    }

    interface Session {
        user: {
            _id?: string,
            role:string,
            name?: string,
            lastname?: string
        } & DefaultSession['User']
    }
 
}

declare module 'next-auth/jwt' {
    interface jwt {
        _id?: string,
        role:string,
        name?: string,
        lastname?: string
    }
}