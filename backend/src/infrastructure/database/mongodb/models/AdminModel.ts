import mongoose , {Schema} from "mongoose";
import { IAdminDocument } from "../documentInterface/IAdminDocument";

const AdminSchema = new Schema < IAdminDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'admin' },
}, {timestamps: true});

export const AdminModel = mongoose.model<IAdminDocument>("Admin", AdminSchema);