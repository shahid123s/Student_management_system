import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";


export class DeleteStudentUseCase {
    constructor(private studentRepository: IStudentRepository) {}

    async execute(id: string): Promise<void> {
        const student = await this.studentRepository.getStudent(id);
        if (!student) {
            throw new Error("Student not found");
        }
        await this.studentRepository.deleteStudent(id);
        console.log(`Student with ID ${id} deleted successfully.`);
    }
}