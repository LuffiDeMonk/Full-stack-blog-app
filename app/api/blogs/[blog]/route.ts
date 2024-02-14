import { Post } from "@/backend/models/post";
import { connectToDB } from "@/lib/connectToDb";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { blog: string } }) => {
    const blogId = params.blog;
    connectToDB()
    try {
        const selectedPost = await Post.findById(blogId).limit(3).populate({ path: 'user', select: ['name', 'image'] })
        if (!selectedPost) {
            return NextResponse.json({ error: "No post for the given id" })
        }
        return NextResponse.json({ post: selectedPost })

    } catch (error) {
        console.log(error)
    }
}