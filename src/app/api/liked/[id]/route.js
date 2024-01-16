

import Like from "@/models/likes";

import { NextResponse } from "next/server";



export async function GET(requests){
    const userid = await requests.url.split("liked/")[1];
    const postliked = await Like.find({author:userid});
    const islikedbyme = postliked.map(like=>like.post);
    // const res = await Post.find().populate('author').sort({createdAt:-1}).limit(20).exec();
    return NextResponse.json(islikedbyme);
}
