import React from 'react'
import Navbar from '@/components/Navbar'
import Container from '@/components/container'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { addBlog } from './action'



export default function AddBlog() {
    return (
        <>
            <Navbar />
            <Container>
                <h1 className='text-4xl font-semibold my-12'>Add Blog</h1>
                <form className='w-[60%] space-y-6' action={addBlog}>
                    <Input type='text' name='title' placeholder='Enter your title' />
                    <Input type='file' name='poster' placeholder='Enter your image' />
                    <Textarea name='description' placeholder='Describe your blog' />
                    <Button variant='default'>Submit</Button>
                </form>
            </Container>
        </>
    )
}
