import Container from '@/components/container'
import { DateTime } from 'luxon'
import Image from 'next/image'
import React from 'react'

type APIResponse = {
    post: {
        _id: string,
        title: string,
        description: string,
        posterImage: string,
        category: string,
        createdAt: string,
        updatedAt: string,
        user: {
            name: string,
            image: string
        }
    }
}

const getSingleBlog = async (blogID: string) => {
    const response = await fetch(`${process.env.DB_URL}/api/blogs/${blogID}`, { next: { revalidate: 3600 } })
    if (!response.ok) {
        console.log('error in fetching individual blog post')
        return false
    }
    return response.json()
}

export default async function Blog({ params }: { params: { blog: string } }) {
    const blogId = params.blog
    const post: APIResponse = await getSingleBlog(blogId)
    const publishedDate = DateTime.fromISO(post.post.createdAt!, DateTime.DATETIME_MED)

    return (
        <Container>
            <div className="my-8">
                <h1 className="text-4xl font-bold text-center">{post.post.title}</h1>
                <div className="flex items-center justify-between flex-wrap my-5">
                    <div className="text-sm text-slate-200 dark:text-slate-700 font-bold">
                        Published At:<span className='ml-2 font-light'>{publishedDate.toFormat('LLL dd, yyyy')}</span>
                    </div>
                    <div className='text-sm font-semibold text-slate-200 dark:text-slate-700'>
                        Written By: <span className='ml-2 font-light'>{post.post.user.name}</span>
                    </div>
                </div>
                <div className="h-96 relative my-10 rounded-xl overflow-hidden">
                    <Image src={post.post.posterImage} fill alt={post.post.title} className='absolute top-0 left-0 object-cover' />
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.post.description }} />
            </div>
        </Container>
    )
}
