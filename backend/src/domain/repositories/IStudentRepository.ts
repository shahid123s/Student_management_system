import { LoginStudentRequestDTO, UpdateStudentRequestDTO } from "../../infrastructure/web/DTO/StudentDTO";
import { Student } from "../entities/Student";

export interface IStudentRepository {
    create(student: Student): Promise<Student>;
    getStudentByEmail(email: string): Promise<Student | null>;
    validateCredentials(student: LoginStudentRequestDTO): Promise<Student | null>;
    getStudents(): Promise<Student[]>;
    getStudent(id: string): Promise<Student| null>;
    // addStudent(student: Student): Promise<void>;
    updateStudent(student: UpdateStudentRequestDTO): Promise<void>;
    deleteStudent(id: string): Promise<void>;
}


