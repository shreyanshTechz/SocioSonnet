import Connect from "@/database/mongo.config";
import Like from "@/models/likes";
import Post from "@/models/posts";


import { NextResponse } from "next/server";



async function updateLike(postId) {
    const res = await Post.findByIdAndUpdate(postId,{likeCount:await Like.countDocuments({post:postId})}, { new: true });
}


export async function POST(requests){
    await Connect();
    const userid = await requests.url.split("/").reverse()[0];
    const postid = await requests.url.split("/").reverse()[1];
   
    const existingLike = await Like.findOne({author:userid,post:postid});
    if(existingLike){
        await Like.findOneAndDelete({author:userid,post:postid}).then(()=>
        updateLike(postid)
        );
        return NextResponse.json(null);
    }
    else{
       await Like.create({
            author:userid,
            post:postid
        }).then(()=>updateLike(postid));
        
    }
    return NextResponse.json({liked:true});
}
