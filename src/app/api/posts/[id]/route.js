
import Connect from "@/database/mongo.config";
import Post from "@/models/posts";
import { NextResponse } from "next/server";

Connect();

export async function POST(requests){
    const id = await requests.url.split("posts/")[1];
    const Text = await requests.json();
    console.log(Text);
    const res = await Post.create({
        author : id,
        text : Text
    })
    return NextResponse.json(res);
}

