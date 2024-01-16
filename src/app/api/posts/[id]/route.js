
import Connect from "@/database/mongo.config";
import Post from "@/models/posts";
import { NextResponse } from "next/server";



export async function GET(requests){
    await Connect();
    const id = await requests.url.split("posts/")[1];
    console.log(id);
    const res = await Post.findById(id).populate('author');
    // const res = await Post.find().populate('author').sort({createdAt:-1}).exec();
    return NextResponse.json(res);
}


export async function POST(requests){
    const id = await requests.url.split("posts/")[1];
    const {Text,postid} = await requests.json();
    const res = await Post.create({
        author : id,
        text : Text,
        likeCount: 0,
        parent:postid
    })
    if(postid){
        const result = await Post.findById(postid);
        result.replyCount = result.replyCount + 1
        console.log(result.replyCount);
        result.save();
    }
   
    await res.populate('author');
    return NextResponse.json(res);
}

