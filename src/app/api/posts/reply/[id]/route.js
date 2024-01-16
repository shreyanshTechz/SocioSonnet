
import Connect from "@/database/mongo.config";
import Post from "@/models/posts";
import { NextResponse } from "next/server";



export async function GET(requests){
    await Connect();
    const id = await requests.url.split("reply/")[1];
    console.log(id);
    const res = await Post.find({parent:id}).populate('author');
    
    return NextResponse.json(res);
}