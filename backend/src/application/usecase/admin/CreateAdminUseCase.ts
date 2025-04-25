
import { Admin } from "../../../domain/entities/Admin";
import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";
import { CreateAdminRequestDTO } from "../../../infrastructure/web/DTO/AdminDTO";
import { hashPassword } from "../../../utils/password";



export class CreateAdminUseCase {
    constructor(private adminRepository: IAdminRepository,){}

    async execute(admin: CreateAdminRequestDTO) : Promise<Admin> {
        const existingAdmin = await this.adminRepository.getAdminByEmail(admin.email);

        if (existingAdmin) {
            throw new Error("Admin with this email already exists");
        }
        const hashedPassword = await hashPassword(admin.password);
        admin.password = hashedPassword;
        const createdAdmin = await this.adminRepository.create(admin);
        console.log(createdAdmin, 'At create admin use case');
        return createdAdmin;
    }
}