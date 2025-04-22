import { Student } from "../../../domain/entities/Student";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { CreateStudentRequestDTO } from "../../../infrastructure/web/DTO/StudentDTO";
import { hashPassword } from "../../../utils/password";
export class CreateStudentUseCase {
    constructor(private studentRepository: IStudentRepository) {}

    async execute(studentData: CreateStudentRequestDTO): Promise<Student> {
        const existingStudent = await this.studentRepository.getStudentByEmail(studentData.email);

        if (existingStudent) {
            throw new Error("Student with this email already exists");
        }

        const hashedPassword = await hashPassword(studentData.password);
        studentData.password = hashedPassword;

        const student = new Student(
            null,
            studentData.name,
            studentData.age,
            studentData.gender,
            studentData.address,
            studentData.phone,
            studentData.email,
            studentData.classId,
            studentData.className,
            studentData.rollNo,
            studentData.password,
        )
        const createdStudent = await this.studentRepository.create(student);
        console.log(createdStudent, 'At create student use case');
        return createdStudent;
    }
}