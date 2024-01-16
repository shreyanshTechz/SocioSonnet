import Connect from "@/database/mongo.config";
import { User } from "@/models/user";
import { NextResponse } from "next/server";



export async function GET(requests){
    await Connect();
    const id = requests.url.split("user/")[1];
    const user = await User.findById(id);
    return NextResponse.json(user);
}

export async function PUT(requests){
    await Connect();
    const id = await requests.url.split("user/")[1];
    const username =await requests.json();
    const user = await User.findByIdAndUpdate(id,{username:username}, { new: true });
    return NextResponse.json(user,{status:200});
}