import { IStudentRepository } from "../domain/repositories/IStudentRepository";
import { MongoStudentRepository } from "../infrastructure/database/mongodb/repositories/MongoStudentRepository";
import { CreateStudentUseCase } from "../application/usecase/student/CreateStudentUseCase";
import { LoginStudentUseCase } from "../application/usecase/student/LoginStudentUseCase";
import { StudentController } from "../infrastructure/web/controllers/StudentController";

export interface Container {
    studentRepository: IStudentRepository;
    createStudentUseCase: CreateStudentUseCase;
    studentController: StudentController;
}

export const createContainer = (): Container => {
    const studentRepository = new MongoStudentRepository();
    const createStudentUseCase = new CreateStudentUseCase(studentRepository);
    const loginStudentUseCase = new LoginStudentUseCase(studentRepository);
    const studentController = new StudentController(createStudentUseCase, loginStudentUseCase);

    return {
        studentRepository,
        createStudentUseCase,
        studentController,
    };
}
