const { default: mongoose, model, models, Schema } = require("mongoose");

const FollowSchema = new Schema({
    source: {type:mongoose.Types.ObjectId,ref:'Users'},
    destination :{type:mongoose.Types.ObjectId,ref:'Users'}
});

const Follow = models?.Follow || model('Follow',FollowSchema);
export default Follow;