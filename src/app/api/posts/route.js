import Connect from "@/database/mongo.config";
import  Post  from "@/models/posts";
import { NextResponse } from "next/server";


export const revalidate = 1;
export async function GET(){
    await Connect();
    const res = await Post.find({author:none}).populate('author').sort({createdAt:-1}).limit(20).exec();
    return NextResponse.json(res);
}