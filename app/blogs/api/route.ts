import { type NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDb";
import { Post } from "@/backend/models/post";

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const category = searchParams.get('category')

    const query = category !== '' ? { category } : {}
    const searchQuery = search !== "" ? { title: { $regex: search, $options: 'i' } } : {}



    connectToDB()
    try {
        const Posts = await Post.find({ ...searchQuery, ...query }).sort({ createdAt: -1 }).populate({ path: 'user', select: ['name', 'image'] })

        //if no posts are found
        if (Posts.length === 0) {
            return NextResponse.json({ Posts: [] })
        }

        return NextResponse.json({ Posts })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error })
    }
}