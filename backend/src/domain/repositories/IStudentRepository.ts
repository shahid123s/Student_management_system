import { Student } from "../entities/Student";

export interface IStudentRepository {
    create(student: Student): Promise<Student>;
    getStudentByEmail(email: string): Promise<Student | null>;
    // getStudents(): Promise<Student[]>;
    // getStudent(id: string): Promise<Student>;
    // addStudent(student: Student): Promise<void>;
    // updateStudent(student: Student): Promise<void>;
    // deleteStudent(id: string): Promise<void>;
}
