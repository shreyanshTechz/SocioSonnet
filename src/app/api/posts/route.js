import Connect from "@/database/mongo.config";
import  Post  from "@/models/posts";
import { NextResponse } from "next/server";



export async function GET(){
    await Connect();
    const res = await Post.find({author:null}).populate('author').sort({createdAt:-1}).limit(20);
    return NextResponse.json(res);
}