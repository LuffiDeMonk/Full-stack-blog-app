'use server';

import { Post } from "@/backend/models/post";
import { storage } from "@/firebase";
import { connectToDB } from "@/lib/connectToDb";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const addBlog = async (formData: FormData) => {

    const title = formData.get('title')
    const description = formData.get('description')
    const blogImage = formData.get('Poster') as File

    const fileRef = ref(storage, "images")

    try {
        const fileUrl = await uploadBytes(fileRef, blogImage)
        const posterImage = await getDownloadURL(fileUrl.ref)

        connectToDB()

        const newPost = new Post({
            title,
            description,
            posterImage
        })

        await newPost.save()

    } catch (error) {
        console.log(error)
    }

    // uploadBytes(fileRef, blogImage).then(data => {
    //     getDownloadURL(data.ref).then(url => console.log(url))
    // })

}