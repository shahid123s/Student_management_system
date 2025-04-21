import mongoose ,{ Schema } from "mongoose";
import { IStudentDocument } from "../documentInterface/IStudentDocument";

const StudentSchema  = new Schema<IStudentDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    classId: { type: Number, required: true },
    className: { type: String, required: true },
    rollNo: { type: Number, required: true },
}, {timestamps: true});


export const StudentModel = mongoose.model<IStudentDocument>("Student", StudentSchema);