'use-client'
import Connect from "@/database/mongo.config";
import UserInfo from "@/hooks/userinfo";
import Like from "@/models/likes";
import  Post  from "@/models/posts";
import { NextResponse } from "next/server";



export async function GET(requests){
    const userid = await requests.url.split("liked/")[1];
    const postliked = await Like.find({author:userid});
    const islikedbyme = postliked.map(like=>like.post);
    // const res = await Post.find().populate('author').sort({createdAt:-1}).limit(20).exec();
    return NextResponse.json(islikedbyme);
}
