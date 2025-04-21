import { Document } from "mongoose";

export interface IStudentDocument extends Document {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    address: string;
    phone: string;
    classId: number;
    className: string;
    rollNo: number;
}