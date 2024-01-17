import Connect from "@/database/mongo.config";
import  Post  from "@/models/posts";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET(requests){
    await Connect();
    const res = await Post.find({parent:null}).populate('author').sort({createdAt:-1}).limit(20).exec();
    return NextResponse.json(res);
}