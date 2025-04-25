import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { LoginStudentRequestDTO, LoginStudentResponseDTO } from "../../../infrastructure/web/DTO/StudentDTO";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { comparePassword } from "../../../utils/password";


export class LoginStudentUseCase {
    constructor(private studentRepository: IStudentRepository) {}

    async execute(data: LoginStudentRequestDTO): Promise<boolean | LoginStudentResponseDTO>{
        const student = await this.studentRepository.validateCredentials(data);
        if (!student) {
            return false;
        }
        const isValidPassword = await comparePassword(data.password, student.password)
        if (!isValidPassword) {
            return false;
        }

        const [accessToken, refreshToken] = await Promise.all([
            generateAccessToken({ userId: student.id as string, role: student.role }) ,
            generateRefreshToken({ userId: student.id as string, role: student.role }),
        ])

        if(!accessToken || !refreshToken) {
            throw new Error('Failed to generate tokens');
        }
        
        return {
            email: student.email,
            name: student.name,
            accessToken: accessToken,
            refreshToken: refreshToken,
            id : student.id,
            role: student.role
        }


    }

}