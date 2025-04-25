import { CreateAdminUseCase } from "../../../application/usecase/admin/CreateAdminUseCase";
import { Request, Response } from 'express';
import { CreateAdminRequestDTO, LoginAdminRequestDTO } from "../DTO/AdminDTO";
import { GetStudentUseCase } from "../../../application/usecase/student/GetStudentUseCase";
import { UpdateStudentUseCase } from "../../../application/usecase/student/UpdateStudentUseCase";
import { UpdateStudentRequestDTO } from "../DTO/StudentDTO";
import { DeleteStudentUseCase } from "../../../application/usecase/student/DeleteStudentUseCase";
import { CreateStudentUseCase } from "../../../application/usecase/student/CreateStudentUseCase";
import { LoginAdminUseCase } from "../../../application/usecase/admin/LoginAdminUseCase";

export class AdminController {
    constructor(
        private createAdminUseCase: CreateAdminUseCase,
        private getStudentUseCase: GetStudentUseCase,
        private updateStudentUseCase: UpdateStudentUseCase,
        private deleteStudentUseCase: DeleteStudentUseCase,
        private createStudentUseCase: CreateStudentUseCase,
        private loginAdminUseCase : LoginAdminUseCase,
    ){}

    async createAdmin(req: Request, res: Response): Promise<void> {
        try {
            const adminData : CreateAdminRequestDTO = req.body;
            const createAdmin = await this.createAdminUseCase.execute(adminData)
            res.status(201).json({data:createAdmin, message: "Admin created successfully"});
        } catch (error) {
            res.status(400).json({ error: (error as Error).message, message: "Failed to create admin" });
        }
    }
    async getStudents (req: Request, res: Response): Promise<void> {
        try {
            const students = await this.getStudentUseCase.execute();
            res.status(200).json({ message: "Students fetched successfully" , data: students, success: true });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message, message: "Failed to fetch students" });
        }
    }

    async updateStudent(req: Request, res: Response): Promise<void> {
        try {
            const studentData : UpdateStudentRequestDTO = req.body;
            await this.updateStudentUseCase.execute(studentData);
            res.status(200).json({ message: "Student updated successfully" , success: true });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message, message: "Failed to update student" });
        }
    }

    async deleteStudent(req: Request, res: Response): Promise<void> {
        try {
            const studentId = req.params.id || req.query.id;
            await this.deleteStudentUseCase.execute(studentId as string);
            res.status(200).json({ message: "Student deleted successfully", success: true });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message, message: "Failed to delete student" });
        }
    }
    async createStudent(req: Request, res: Response): Promise<void> {
        try {
            const studentData = req.body;
            const createdStudent = await this.createStudentUseCase.execute(studentData);
            res.status(201).json({ data: createdStudent, message: "Student created successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: (error as Error).message, message: "Failed to create student" });
        }
    }
    async login (req: Request, res: Response): Promise<void> {
        try {
            const studentData: LoginAdminRequestDTO = req.body;
            const result = await this.loginAdminUseCase.execute(studentData);

            res.status(200).json({ data: result, message: "Student logged in successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: (error as Error).message, message: "Failed to login student" });
        }
    }
}