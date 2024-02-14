import BlogCard from '@/components/blogs/BlogCard'
import CustomHeading from '@/components/blogs/CustomHeading'
import SearchInput from '@/components/blogs/SearchInput'
import Container from '@/components/container'
import { Input } from '@/components/ui/input'
import { Metadata } from 'next'
import React from 'react'

type Post = {
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

type PostData = {
    Posts: Post[]
}

export const metadata: Metadata = {
    title: 'Blog App | Blogs',
    description: "This page contains all the posts"
}

const fetchAllPosts = async (search: string, category?: string) => {
    const response = await fetch(`https://full-stack-blog-app-inky.vercel.app/blogs/api?search=${search}&category=${category}`, {
        next: {
            revalidate: 100
        }
    })
    if (!response.ok) {
        console.log("Error in fetching data")
    }

    return response.json()
}

export default async function Blogs({ searchParams }: { searchParams: { search?: string, category?: string } }) {
    const search = searchParams?.search || ''
    const category = searchParams?.category || ''
    const postData: PostData = await fetchAllPosts(search, category)
    return (
        <Container>
            <div className="mt-7 mb-12 flex items-center justify-between flex-wrap gap-y-4">
                <CustomHeading heading='Posts' />
                <SearchInput />
            </div>
            <div className="space-y-10 mb-6">
                {
                    postData.Posts.map((post) => (
                        <React.Fragment key={post._id}>
                            <BlogCard post={post} />
                        </React.Fragment>
                    ))
                }
            </div>
        </Container>
    )
}
