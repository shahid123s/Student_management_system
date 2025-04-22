import {Router} from 'express';
import { StudentController } from '../controllers/StudentController';

export  const makeStudentRoute = (studentController: StudentController) => {
    const router = Router();

    router.post('/create', (req, res) => studentController.createStudent(req, res));
    router.post('/login', (req, res) => studentController.loginStudent(req, res));
    return router;
}

