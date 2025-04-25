import mongoose ,{ Schema } from "mongoose";
import { IStudentDocument } from "../documentInterface/IStudentDocument";

const StudentSchema  = new Schema<IStudentDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    marks: { type: Number, required: true },
    className: { type: String, required: true },
    rollNo: { type: Number, required: true },
}, {timestamps: true});


export const StudentModel = mongoose.model<IStudentDocument>("Student", StudentSchema);