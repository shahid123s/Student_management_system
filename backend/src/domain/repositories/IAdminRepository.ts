
import { CreateAdminRequestDTO } from "../../infrastructure/web/DTO/AdminDTO";
import { Admin } from "../entities/Admin"


export interface IAdminRepository {
    create(admin:CreateAdminRequestDTO) : Promise<Admin>,
    getAdminByEmail(email: string) : Promise<Admin | null>,
    getAdmin(email: string): Promise<Admin| null>,
    // getAdmin(id: string): <Promise<Admin>>,
}