const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // links to User model
        required: true
    }
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model('Post', postSchema);
