import mongoose, { connect } from "mongoose";

export async function Connect(){
    if(mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise();
    }
    return await mongoose.connect(process.env.MONGODB_URI).then(()=> console.log('Database connected'));
};