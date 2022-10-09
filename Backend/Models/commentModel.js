const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
      },
      username: {
        type: String
      }
    
});

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;