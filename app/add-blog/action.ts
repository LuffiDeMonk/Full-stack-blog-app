'use server'

import { auth } from "@/auth"
import { Post } from "@/backend/models/post"
import { storage } from "@/firebase"
import { connectToDB } from "@/lib/connectToDb"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { revalidatePath } from "next/cache"


export const addBlog = async (formData: FormData) => {

    const session = await auth()
    const user = session?.user.id

    const title = formData.get('title')
    const description = formData.get('description')
    const blogImage = formData.get('poster') as File
    const category = formData.get('category')

    const fileRef = ref(storage, `images/${blogImage.name}`)

    try {
        const fileUrl = await uploadBytes(fileRef, blogImage)
        const posterImage = await getDownloadURL(fileUrl.ref)

        connectToDB()

        const newPost = new Post({
            title,
            description,
            posterImage,
            category,
            user
        })

        await newPost.save()
        revalidatePath('/blogs')

        return {
            success: "New Blog post created successfully"
        }

    } catch (error) {
        return {
            error: "An Unknown error occured"
        }
    }
}