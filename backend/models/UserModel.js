const mongoose = require("mongoose");
Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    }
}, {
    timestaps: true
})

module.exports = mongoose.model("User", userSchema);