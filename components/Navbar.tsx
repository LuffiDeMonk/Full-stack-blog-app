import React from 'react'
import Container from './container'
import Navmenu from './Navmenu'
import ThemeToggler from './ThemeToggler'
import ProfileContainer from './ProfileContainer'
import { auth } from '@/auth'
import LoginButton from './LoginButton'
import Link from 'next/link'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'



export default async function Navbar() {
    const session = await auth()
    return (
        <section className='py-2 border-b'>
            <Container>
                <div className="flex items-center justify-between">
                    <div className="py-4 text-xl font-light">Header</div>

                    <div className='block md:hidden'>
                        <Button variant='ghost'>
                            <MenuIcon />
                        </Button>
                    </div>

                    <div className='hidden md:flex items-center gap-6'>
                        <Link href='/'>Home</Link>
                        <Link href='/blogs'>Blogs</Link>
                        <Link href='/'>Home</Link>
                    </div>
                    <div className="hidden md:flex gap-2 items-center">
                        <ThemeToggler />
                        {
                            session !== null ? <ProfileContainer /> : <LoginButton />
                        }

                    </div>
                </div>
            </Container>
        </section>
    )
}
