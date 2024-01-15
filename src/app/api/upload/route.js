import { NextResponse } from "next/server";
import multiparty from 'multiparty'
export default async function POST(req,res) {
    // NextResponse.json({status:200});
    const form = new multiparty.Form({
        uploadDir : './public'
    });
    
    form.parse(req,async (err,fields,files)=>{
        if(err) throw err;
        NextResponse.json(files);
    })
}

export const config = {
    api :{
        bodyParser : false,
    }
}