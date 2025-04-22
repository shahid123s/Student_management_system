import {Request, Response} from 'express';
import { CreateStudentUseCase } from '../../../application/usecase/student/CreateStudentUseCase';
import { CreateStudentRequestDTO, CreateStudentResponseDTO, LoginStudentRequestDTO } from '../DTO/StudentDTO';
import { LoginStudentUseCase } from '../../../application/usecase/student/LoginStudentUseCase';


export class StudentController {
    constructor(
        private createStudentUseCase: CreateStudentUseCase,
        private loginStudentUseCase: LoginStudentUseCase,

    ) {}
    
    async createStudent(req: Request, res: Response): Promise<void> {
        
        try { 
            const studentData: CreateStudentRequestDTO = req.body;
            const createdStudent = await this.createStudentUseCase.execute(studentData);
            const responseDTO: CreateStudentResponseDTO = {
                id: createdStudent.id,
                name: createdStudent.name,
                age: createdStudent.age,
                gender: createdStudent.gender,
                address: createdStudent.address,
                phone: createdStudent.phone,
                email: createdStudent.email,
                classId: createdStudent.classId,
                className: createdStudent.className,
                rollNo: createdStudent.rollNo,
            };
            res.status(201).json({data:responseDTO, message: "Student created successfully"});
        } catch (error) {
            res.status(400).json({ error: (error as Error).message, message: "Failed to create student" });
        }
    }


    async loginStudent(req: Request, res: Response) : Promise<void> {
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

}