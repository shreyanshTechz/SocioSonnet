import  Post  from "@/models/posts";
import { NextResponse } from "next/server";



export async function GET(){
    const res = await Post.find({parent:null}).populate('author').sort({createdAt:-1}).limit(20);
    return NextResponse.json(res);
}