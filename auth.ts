import NextAuth, { DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import { connectToDB } from './lib/connectToDb'
import { User } from './backend/models/user'
import { authConfig } from './auth.config'

interface Session extends DefaultSession {
    user: {
        id: string,
        email: string
    } & DefaultSession['user']
}



export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth(
    {
        ...authConfig,
        providers: [Google],
        callbacks: {

            async session({ session }) {
                connectToDB()
                try {
                    const existingUser = await User.findOne({ email: session.user?.email })
                    if (existingUser) {
                        session.user.id = existingUser._id.toString()
                    }

                } catch (error) {
                    console.log(error)
                }
                return session

            },

            async signIn({ user }) {
                connectToDB()
                try {
                    const findUser = await User.findOne({ email: user.email })
                    if (!findUser) {
                        const newUser = new User({
                            email: user.email,
                            name: user.name,
                            image: user.image
                        })
                        await newUser.save()
                    }
                    return true

                } catch (error) {
                    console.log(error)
                    return false
                }
            }
        },
    }
)