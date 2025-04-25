import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";
import { LoginAdminRequestDTO, LoginAdminResponseDTO } from "../../../infrastructure/web/DTO/AdminDTO";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { comparePassword } from "../../../utils/password";

export class LoginAdminUseCase {
    constructor(private adminRepository: IAdminRepository) {}

    async execute (data: LoginAdminRequestDTO): Promise<boolean | LoginAdminResponseDTO> {
        const admin  = await this.adminRepository.getAdmin(data.email);
        console.log(admin, 'admin in login Usecase');
        if (!admin) {
            return false;
        }
        const isValidPassword = await comparePassword(data.password, admin.password);
        console.log(isValidPassword, 'isValidPassword in login Usecase');
        if (!isValidPassword) {
            return false;
        }
        const [accessToken, refreshToken] = await Promise.all([
            generateAccessToken({ userId: admin.id as string, role: admin.role }),
            generateRefreshToken({ userId: admin.id as string, role: admin.role }),
        ]);
        if (!accessToken || !refreshToken) {
            throw new Error('Failed to generate tokens');
        }
        return {
            email: admin.email,
            name: admin.name,
            accessToken: accessToken,
            refreshToken: refreshToken,
            id: admin.id ?? '',
            role: admin.role,
        }
    }
 
}
