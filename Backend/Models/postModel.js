const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
    image: {
        type: String, 
        
    },
    username: {type: String, required: true},
    caption: {type: String},
    comments: [{type: Schema.Types.ObjectId, ref: "comment"}],
    date: {type: Date, default: Date.now}
    
});

const post = mongoose.model("post", postSchema);

module.exports = post;