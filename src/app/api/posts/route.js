import Connect from "@/database/mongo.config";
import  Post  from "@/models/posts";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";


export async function GET(request){
    await Connect();
    const res = await Post.find().populate('author').sort({createdAt:-1}).limit(20).exec();
    const path = request.nextUrl.searchParams.get("path") || "/";
    revalidatePath(path);
    return NextResponse.json(res);
}