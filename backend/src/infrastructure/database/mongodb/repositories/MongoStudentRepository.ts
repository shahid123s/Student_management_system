import { Student } from "../../../../domain/entities/Student";
import { IStudentDocument } from "../documentInterface/IStudentDocument";
import { IStudentRepository } from "../../../../domain/repositories/IStudentRepository";
import { StudentModel } from "../models/StudentModel";
import { LoginStudentRequestDTO, UpdateStudentRequestDTO } from "../../../web/DTO/StudentDTO";

export class MongoStudentRepository implements IStudentRepository {
    
    private mapDocumentToStudent(document: IStudentDocument): Student {
        return new Student(
            (document._id as unknown as string).toString(),
            document.name,
            document.dob,
            document.marks,
            document.email,
            document.className,
            document.rollNo,
            document.password,
        );
    }

    private mapDocumentToEntitySafety(document: IStudentDocument): Student {
        const student = this.mapDocumentToStudent(document);
        student.password = '';
        return student;
    }
    async create(student: Student): Promise<Student> {
        const newStudent = new StudentModel(student);
        const savedStudent = await newStudent.save();
        console.log(savedStudent, 'At Student Repostiroy create')
        return this.mapDocumentToEntitySafety(savedStudent);
    }

    async getStudentByEmail (email: string): Promise<Student | null> {
        const student = await StudentModel.findOne({ email });
        if (student) {
            console.log(student, 'At Student Repostiroy getStudentbyId')
            return this.mapDocumentToStudent(student);
        }
        return null;
    }

    async validateCredentials(data: LoginStudentRequestDTO): Promise<Student | null> {
        const student = await StudentModel.findOne({email: data.email});
        if(student) {
            return this.mapDocumentToStudent(student);
        }
        return null;
    }

    async getStudents(): Promise<Student[]> {
        const students = await StudentModel.find();
        return students.map((student) => this.mapDocumentToEntitySafety(student));
    }

    async updateStudent(student: UpdateStudentRequestDTO): Promise<void> {
        await StudentModel.findByIdAndUpdate(student.id, student);
    }

    async deleteStudent(id: string): Promise<void> {
        await StudentModel.findByIdAndDelete(id);
    }

    async getStudent(id: string): Promise<Student| null> {

    const student =  await StudentModel.findById(id);
    if(student) {
        return this.mapDocumentToEntitySafety(student);
    }
    return null;
    }
}