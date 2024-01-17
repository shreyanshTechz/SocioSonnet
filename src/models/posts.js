const { Schema, default: mongoose, models, model } = require("mongoose");

const Postschema = new Schema({
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: 'true' },
    text: { type: String, minlength: 5, maxlength: 2555, required: true },
    likeCount: { type: Number, required: true,default:0 },
    replyCount: { type: Number, required: true,default:0 },
    parent: { type: mongoose.Types.ObjectId, ref: 'Post' }
}, {
    timestamps: true,
});

const Post = models?.Post || model('Post', Postschema);
export default Post;