import { Request, Response } from 'express';
import { CreateStudentUseCase } from '../../../application/usecase/student/CreateStudentUseCase';
import { CreateStudentRequestDTO, CreateStudentResponseDTO, LoginStudentRequestDTO } from '../DTO/StudentDTO';
import { LoginStudentUseCase } from '../../../application/usecase/student/LoginStudentUseCase';
import { GetStudentProfileUseCase } from '../../../application/usecase/student/GetStudentProfileUseCase';


export class StudentController {
    constructor(
        private createStudentUseCase: CreateStudentUseCase,
        private loginStudentUseCase: LoginStudentUseCase,
        private getStudentProfileUseCase: GetStudentProfileUseCase,

    ) { }

    async createStudent(req: Request, res: Response): Promise<void> {

        try {
            const studentData: CreateStudentRequestDTO = req.body;
            const createdStudent = await this.createStudentUseCase.execute(studentData);
            const responseDTO: CreateStudentResponseDTO = {
                id: createdStudent.id,
                name: createdStudent.name,
                dob: createdStudent.dob,
                marks: createdStudent.marks,
                email: createdStudent.email,
                className: createdStudent.className,
                rollNo: createdStudent.rollNo,
            };
            res.status(201).json({ data: responseDTO, message: "Student created successfully" });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message, message: "Failed to create student" });
        }
    }


    async loginStudent(req: Request, res: Response): Promise<void> {
        try {
            const studentData: LoginStudentRequestDTO = req.body;
            const result = await this.loginStudentUseCase.execute(studentData);

            if (result === false) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }
            res.status(200).json({ data: result, message: "Student logged in successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: (error as Error).message, message: "Failed to login student" });
        }
    }

    async getStudent(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const id: string | undefined = req.params.id as string | undefined || req.query.id as string | undefined;
            if(!id){
                return res.status(400).json({ message: "Student ID is required" });
            }
            const students = await this.getStudentProfileUseCase.execute(id);
            return res.status(200).json({ data: students, message: "Students fetched successfully" });
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message, message: "Failed to fetch students" });
        }
    }


}