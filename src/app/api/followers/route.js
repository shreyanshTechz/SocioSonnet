import Follow from "@/models/follow";
import { NextResponse } from "next/server";

export async function POST(requests) {
    const {source,destination} = await requests.json();

    const existingFollow = await Follow.findOne({destination,source});
    if(existingFollow){
        await Follow.findOneAndDelete({destination,source});
        return NextResponse.json('ok');
    }


    const follow = new Follow({
        source:source,
        destination:destination
    })
    await follow.save();
    return NextResponse.json(follow);
}