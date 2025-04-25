import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { UpdateStudentRequestDTO } from "../../../infrastructure/web/DTO/StudentDTO";

export class UpdateStudentUseCase {
    constructor(private studentRepository: IStudentRepository) {}

    async execute(student: UpdateStudentRequestDTO): Promise<void> {
        const { id, rollNo, marks, className } = student;
        if (!id) {
            throw new Error("Student ID is required");
        }
        await this.studentRepository.updateStudent({ id, rollNo, marks, className });
    }
}