import { Student } from "../../../domain/entities/Student";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";


export class GetStudentUseCase {
    constructor(private studentRepository: IStudentRepository) {}

    async execute(): Promise<Student[]> {
        const students = await this.studentRepository.getStudents();
        return students;
    }
}