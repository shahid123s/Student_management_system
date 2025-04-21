import { Student } from "../../../../domain/entities/Student";
import { IStudentDocument } from "../documentInterface/IStudentDocument";
import { IStudentRepository } from "../../../../domain/repositories/IStudentRepository";
import { StudentModel } from "../models/StudentModel";

export class MongoStudentRepository implements IStudentRepository {
    
    private mapDocumentToStudent(document: IStudentDocument): Student {
        return new Student(
            document._id.toString(),
            document.name,
            document.age,
            document.gender,
            document.address,
            document.phone,
            document.email,
            document.classId,
            document.className,
            document.rollNo,
            document.password,
        );
        
    }
    async create(student: Student): Promise<Student> {
        const newStudent = new StudentModel(student);
        const savedStudent = await newStudent.save();
        return this.mapDocumentToStudent(savedStudent);
    }

    async getStudentByEmail (email: string): Promise<Student | null> {
        const student = await StudentModel.findOne({ email });
        if (student) {
            return this.mapDocumentToStudent(student);
        }
        return null;
    }

    
}