
import Connect from "@/database/mongo.config";
import Post from "@/models/posts";
import { User } from "@/models/user";
import {NextRequest, NextResponse } from "next/server";



export async function GET(requests){
    await Connect();
    const id = await requests.url.split("profile/")[1];
    const res = await Post.find({author:id}).populate('author').sort({createdAt:-1});
    return NextResponse.json(res);
}

export async function PUT(requests){
    await Connect();
    const {bio,name,username} = await requests.json();
    console.log(bio);
    const id = await requests.url.split("profile/")[1];
    const res = await User.findByIdAndUpdate(id,{bio,name,username});
    // const res = await Post.find({author:id}).populate('author');
    // const res = await Post.find().populate('author').sort({createdAt:-1}).exec();
    return NextResponse.json(res);
}