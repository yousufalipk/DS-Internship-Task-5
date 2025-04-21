import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFERESH_TOKEN_SECRET = process.env.REFERESH_TOKEN_SECRET;
export const BACKEND_PATH = process.env.BACKEND_PATH;


