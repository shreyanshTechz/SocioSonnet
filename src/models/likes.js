const { default: mongoose, model, models, Schema } = require("mongoose");

const LikeSchema = new Schema({
    author: {type:mongoose.Types.ObjectId,ref:'Users'},
    post :{type:mongoose.Types.ObjectId,ref:'Posts'}
},{
    timestamps: true
});

const Like = models?.Like || model('Like',LikeSchema);
export default Like;