import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    refershToken: {
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

const TokenModel = mongoose.model('tokens', tokenSchema);

export default TokenModel;