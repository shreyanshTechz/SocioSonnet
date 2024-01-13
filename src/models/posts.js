const { Schema, default: mongoose, models, model } = require("mongoose");

const Postschema = new Schema({
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: 'true' },
    text : {type:String,minlength:5,maxlength:255,required:true}
},{
    timestamps:true,
});

const Post = models?.Post || model('Post',Postschema);
export default Post;