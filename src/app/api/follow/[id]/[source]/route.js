'use-client'
import Follow from "@/models/follow";
import { NextResponse } from "next/server";



export async function GET(requests,params){
    const {source,id} = await params.params;
    console.log(params);
    const res = await Follow.findOne({
        source:source,
        destination:id
    })
    // const res = await Post.find().populate('author').sort({createdAt:-1}).limit(20).exec();
    return NextResponse.json(res);
}
