import { Student } from "../../../domain/entities/Student";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";



export class GetStudentProfileUseCase {
    constructor(private studentRepository: IStudentRepository) {}

    async execute(id: string): Promise<Student> {
        const student = await this.studentRepository.getStudent(id);
        if (!student) {
            throw new Error("Student not found");
        }
        return student;
    }
}