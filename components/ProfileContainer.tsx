import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { auth, signOut } from '@/auth'
import Link from 'next/link'
import { Avatar, AvatarImage } from './ui/avatar'

type props = {
    user: {
        name: string,
        email: string,
        image: string
    }
}

export default async function ProfileContainer() {
    const session = await auth()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size='icon'
                    variant='ghost'
                    className='dark:outline-none focus:dark:outline-none'
                >
                    {
                        session !== null &&

                        <Avatar>
                            <AvatarImage src={session.user?.image!} alt={session.user?.name!} />
                        </Avatar>

                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-30 p-2' align='start'>
                <DropdownMenuItem>
                    My Profile
                </DropdownMenuItem>
                <Link href='/add-blog'>
                    <DropdownMenuItem>
                        Add Blog
                    </DropdownMenuItem>
                </Link>
                <form action={async () => {
                    'use server'
                    await signOut()
                }}>
                    <Button variant='ghost'>
                        <DropdownMenuItem>
                            Log Out
                        </DropdownMenuItem>
                    </Button>
                </form>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                    Welcome {session?.user?.name?.split(' ')[0]}!
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}