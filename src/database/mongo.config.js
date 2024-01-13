import mongoose, { connect } from "mongoose";

export default function Connect(){
    return mongoose.connect(process.env.MONGODB_URI).then(()=> console.log('Database connected'));
};