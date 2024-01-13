import Connect from "@/database/mongo.config";
import { User } from "@/models/user";
import { connect } from "mongoose";
import { NextRequest,NextResponse } from "next/server";

Connect();

export async function POST(requests) { 
    const body = await requests.json();
    const user = await new User({
        name:body.name,
        password:body.password,
        email:body.email,
        role:body.role
    })
    const res = await user.save();
    return NextResponse.json(body,{status:200});
}