import { signIn } from '@/auth';
import React from 'react'

type Props = {}

export default async function LoginButton({ }: Props) {
    return (
        <form action={
            async () => {
                'use server';
                await signIn('google')
            }
        }>
            <button className='p-2 rounded-lg text-black dark:text-white'>Log in</button>
        </form>
    )
}