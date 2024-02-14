'use client'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { Input } from '@/components/ui/input'
import { addBlog } from '@/app/add-blog/action'
import { useToast } from '../ui/use-toast'
import 'react-quill/dist/quill.snow.css';
import { FormSchema, TFormSchema } from '@/validation/FormValidation'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '../ui/select'
import { SelectValue } from '../ui/select'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) //dynamically import ReactQuill to solve the error

const BlogCategories = ["Technology", "Health & Wellness", "Travel", "Food & Cooking", "Fashion", "Fitness", "Personal Development", "Finance", "Education", "Art & Design", "Parenting", "Entertainment", "Science", "Business", "Environment", "Politics", "Sports", "Lifestyle", "DIY & Crafts", "Relationships"]


export default function BlogForm() {
    const { toast } = useToast()

    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, watch, setValue } = useForm<TFormSchema>({
        resolver: zodResolver(FormSchema),

    })

    const editorContent = watch('description')
    const selectCategory = watch('category')

    const handleEditorChange = (data: string) => {
        setValue('description', data)
    }
    const handleSelectChange = (data: string) => {
        setValue('category', data)
    }

    const onFormSubmit: SubmitHandler<TFormSchema> = async (data) => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('poster', data.poster[0])
        formData.append('category', data.category)

        const results = await addBlog(formData)
        if (results.error) {
            toast({
                title: results.error,
                variant: 'destructive'
            })
        }
        if (results?.success) {
            toast({
                title: results.success
            })
        }

        reset()
    }

    return (
        <>
            <h1 className='text-4xl font-semibold mt-10 mb-24'>Add Blog</h1>
            <form className='w-[60%] space-y-6' onSubmit={handleSubmit((data) => onFormSubmit(data))}>
                <div className='space-y-2'>
                    <Input type='text' placeholder='Enter your title' {...register('title')} />
                    {errors.title?.message && <p className='text-xs text-red-600'>{errors.title.message}</p>}
                </div>
                <div className='space-y-2'>
                    <Input type='file' placeholder='Enter your image' {...register('poster')} />
                    {errors.poster?.message && <p className='text-xs text-red-600'>{`${errors.poster.message}`}</p>}

                </div>
                <div className="space-y-2">
                    <Select defaultValue={selectCategory} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    BlogCategories.map((item, idx) => (
                                        <SelectItem value={item} key={idx}>{item}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.category?.message && <p className='text-xs text-red-600'>{`${errors.category.message}`}</p>}
                </div>
                <div className='space-y-2'>
                    <ReactQuill theme='snow' value={editorContent} onChange={handleEditorChange} />
                    {errors.description?.message && <p className='text-xs text-red-600'>{errors.description.message}</p>}

                </div>
                <Button type='submit' variant='default' aria-disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Submit"}</Button>
            </form>
        </>
    )
}
