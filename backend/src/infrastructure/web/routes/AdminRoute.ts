import { Router } from "express";
import { AdminController } from "../controllers/AdminController";

export const makeAdminRoute = (adminController: AdminController) => {
    const router = Router();

    router.post('/create', (req, res) => adminController.createAdmin(req, res));
    router.post('/login', (req, res) => adminController.login(req, res));
    router.post('/student-create', (req, res) => adminController.createStudent(req, res));
    router.get('/students', (req, res) => adminController.getStudents(req, res));
    router.put('/student-update', (req, res) => adminController.updateStudent(req, res));
    router.delete('/student-delete', (req, res) => adminController.deleteStudent(req, res));
    return router;
}