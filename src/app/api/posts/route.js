import Connect from "@/database/mongo.config";
import  Post  from "@/models/posts";
import { NextResponse } from "next/server";


export async function GET(requests){
    Connect();
    const res = await Post.find().populate('author').sort({createdAt:-1}).exec();
    return NextResponse.json(res);
}