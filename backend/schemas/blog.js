import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    photoPath: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})

const BlogModel = mongoose.model('blogs', blogSchema);

export default BlogModel;