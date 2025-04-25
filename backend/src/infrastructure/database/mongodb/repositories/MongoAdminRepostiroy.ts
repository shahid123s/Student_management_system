import { Admin } from "../../../../domain/entities/Admin";
import { IAdminRepository } from "../../../../domain/repositories/IAdminRepository";
import { IAdminDocument } from "../documentInterface/IAdminDocument";
import { AdminModel } from "../models/AdminModel";




export class MongoAdminRepository implements IAdminRepository {
    private mapDocumentToAdmin(document: IAdminDocument): Admin {
        return new Admin(
            (document.id as unknown as string).toString(),
            document.name,
            document.email,
            document.password,
        
        );
    }

    async create(admin: Admin): Promise<Admin> {
        const newAdmin = new AdminModel(admin);
        const savedAdmin = await newAdmin.save();
        return this.mapDocumentToAdmin(savedAdmin);
    }

    async getAdminByEmail(email: string): Promise<Admin | null> {
        const admin = await AdminModel.findOne({email});
        if (admin) {
            return this.mapDocumentToAdmin(admin);
        }
        return null;
    }
    async getAdmin(email: string): Promise<Admin | null> {
        const admin = await AdminModel.findOne({email});
        return admin ? this.mapDocumentToAdmin(admin) : null;   
    }
}   