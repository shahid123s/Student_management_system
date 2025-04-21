import {Request, Response} from 'express';
import { CreateStudentUseCase } from '../../../application/usecase/student/CreateStudentUseCase';
import { CreateStudentRequestDTO, CreateStudentResponseDTO } from '../DTO/StudentDTO';


export class StudentController {
    constructor(private createStudentUseCase: CreateStudentUseCase) {}
    
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
            res.status(400).json({ error: error.message, message: "Failed to create student" });
        }
    }

}