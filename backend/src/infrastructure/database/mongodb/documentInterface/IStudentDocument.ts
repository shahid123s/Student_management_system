import { Document } from "mongoose";

export interface IStudentDocument extends Document {
    name: string;
    email: string;
    password: string;
    dob: Date;
    marks: number;
    className: string;
    rollNo: number;
}