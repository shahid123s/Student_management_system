import {Router} from 'express';
import { StudentController } from '../StudentController';

export  const makeStudentRoute = (studentController: StudentController) => {
    const router = Router();

    router.post('/create', (req, res) => studentController.createStudent(req, res));

    return router;
}

