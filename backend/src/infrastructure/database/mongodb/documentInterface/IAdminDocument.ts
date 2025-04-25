import { Document } from "mongoose";

export interface IAdminDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}