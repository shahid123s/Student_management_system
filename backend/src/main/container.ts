import { IStudentRepository } from "../domain/repositories/IStudentRepository";
import { MongoStudentRepository } from "../infrastructure/database/mongodb/repositories/MongoStudentRepository";
import { CreateStudentUseCase } from "../application/usecase/student/CreateStudentUseCase";
import { LoginStudentUseCase } from "../application/usecase/student/LoginStudentUseCase";
import { StudentController } from "../infrastructure/web/controllers/StudentController";
import { CreateAdminUseCase } from "../application/usecase/admin/CreateAdminUseCase";
import { AdminController } from "../infrastructure/web/controllers/AdminController";
import { MongoAdminRepository } from "../infrastructure/database/mongodb/repositories/MongoAdminRepostiroy";
import { UpdateStudentUseCase } from "../application/usecase/student/UpdateStudentUseCase";
import { GetStudentUseCase } from "../application/usecase/student/GetStudentUseCase";
import { DeleteStudentUseCase } from "../application/usecase/student/DeleteStudentUseCase";
import { CorsService } from "../infrastructure/services/corsService";
import { loadCorsConfig } from "../config/corsConfig";
import { GetStudentProfileUseCase } from "../application/usecase/student/GetStudentProfileUseCase";
import { LoginAdminUseCase } from "../application/usecase/admin/LoginAdminUseCase";

export interface Container {
    corsService: CorsService;
    studentRepository: IStudentRepository;
    createStudentUseCase: CreateStudentUseCase;
    studentController: StudentController;
    adminController: AdminController;
}

export const createContainer = (): Container => {
    const corsConfig = loadCorsConfig();
    const corsService = new CorsService(corsConfig);
    const studentRepository = new MongoStudentRepository();
    const createStudentUseCase = new CreateStudentUseCase(studentRepository);
    const loginStudentUseCase = new LoginStudentUseCase(studentRepository);
    const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);
    const getStudentUseCase = new GetStudentUseCase(studentRepository);
    const getStudentProfileUseCase = new GetStudentProfileUseCase(studentRepository);
    const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);
    
    const studentController = new StudentController(createStudentUseCase, loginStudentUseCase,getStudentProfileUseCase );
    
    const adminRepository = new MongoAdminRepository(); 
    const createAdminUseCase = new CreateAdminUseCase(adminRepository);
    const loginAdminUseCase = new LoginAdminUseCase(adminRepository);
    const adminController = new AdminController(createAdminUseCase,getStudentUseCase,updateStudentUseCase,deleteStudentUseCase, createStudentUseCase, loginAdminUseCase )


    return {
        corsService,
        studentRepository,
        createStudentUseCase,
        studentController,
        adminController,
    };
}
