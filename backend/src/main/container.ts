import { IStudentRepository } from "../domain/repositories/IStudentRepository";
import { MongoStudentRepository } from "../infrastructure/database/mongodb/repositories/MongoStudentRepository";
import { CreateStudentUseCase } from "../application/usecase/student/CreateStudentUseCase";
import { StudentController } from "../infrastructure/web/controllers/StudentController";

export interface Container {
    studentRepository: IStudentRepository;
    createStudentUseCase: CreateStudentUseCase;
    studentController: StudentController;
}

export const createContainer = (): Container => {
    const studentRepository = new MongoStudentRepository();
    const createStudentUseCase = new CreateStudentUseCase(studentRepository);
    const studentController = new StudentController(createStudentUseCase);

    return {
        studentRepository,
        createStudentUseCase,
        studentController,
    };
}
