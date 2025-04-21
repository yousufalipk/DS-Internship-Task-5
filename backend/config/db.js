import mongoose from 'mongoose';
import { MONGODB_URI } from './env.js';

const ConnectToDB = () => {
    mongoose.connect(MONGODB_URI).then(() => {
        console.log("Database Connected Successfully!");
    }).catch((error) => {
        console.log("Error Connecting Database!", error);
    })
}

export default ConnectToDB;