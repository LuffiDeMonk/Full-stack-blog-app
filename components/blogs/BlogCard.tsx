import Image from 'next/image'
import React from 'react'
import { DateTime } from 'luxon'
import { readingTime } from 'reading-time-estimator'
import { Clock } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type Post = {
    _id: string,
    title: string,
    description: string,
    posterImage: string,
    category: string,
    createdAt?: string,
    updatedAt?: string,
    user: {
        name: string,
        image: string
    }
}

export default function BlogCard({ post }: { post: Post }) {
    const formattedDate = DateTime.fromISO(post.createdAt!, DateTime.DATETIME_MED)
    const estimatedRead = readingTime(post.description, 10)
    return (
        <div className='flex gap-4 p-4 dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl dark:shadow-none border-gray-100 border dark:border-none translate-y-0 hover:-translate-y-0.5 transition-transform'>
            <div className='sm:w-60 lg:w-80 h-80 border border-gray-100 dark:border-none shrink-0 rounded-md overflow-hidden relative hidden sm:block'>
                <Image src={post.posterImage} alt={post.title} fill fetchPriority='high' className='absolute top-0 left-0 object-cover' />
            </div>
            <div className="flex flex-col justify-between">
                <div className='space-y-4'>
                    <div className="px-5 py-2 text-xs bg-gray-200 dark:bg-gray-800 rounded-lg w-fit text-gray-400">{post.category}</div>
                    <div className="text-xl md:text-2xl font-semibold pb-3">
                        <Link href={`/blogs/${post._id}`} className='hover:text-purple-400 transition-colors'>
                            {post.title}
                        </Link>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <div dangerouslySetInnerHTML={{ __html: post.description }} className='text-ellipsis line-clamp-4 text-sm text-slate-600 dark:text-slate-300'></div>
                </div>
                <div className="flex gap-4 pt-6 ">
                    <Avatar className='hidden sm:block'>
                        <AvatarImage src={post.user.image} alt={post.user.name} />
                        <AvatarFallback>{post.user.name}</AvatarFallback>
                    </Avatar>
                    <div className='space-y-0.5 hidden sm:block'>
                        <h1 className='text-md font-semibold text-stone-300 hover:text-purple-400'>{post.user.name}</h1>
                        <div className='flex items-center gap-2'>
                            <p className='text-sm text-stone-300'>{formattedDate?.toFormat('LLL dd, yyyy')}</p>
                            <Separator orientation='vertical' />
                            <div className="flex items-center gap-2">
                                <Clock size={14} className='text-stone-300' />
                                <p className='text-sm text-stone-300'>{estimatedRead.minutes} min</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:hidden justify-between items-center w-full">
                    <h1 className='text-xs font-semibold text-stone-300 hover:text-purple-400'>{post.user.name}</h1>
                    <div className="flex items-center gap-2">
                        <p className='text-xs text-stone-300'>{formattedDate.toFormat('LLL dd yyyy')}</p>
                        {/* <p className='text-xs text-stone-300'>|</p> */}
                        <Separator orientation='vertical' />
                        <div className="flex items-center gap-0.5">
                            <Clock size={12} className='text-stone-300' />
                            <p className='text-xs text-stone-300'>{estimatedRead.minutes} min</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
