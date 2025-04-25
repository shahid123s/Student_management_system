import {Express} from "express";
import { makeStudentRoute } from "../infrastructure/web/routes/StudentRoute";
import { Container } from "./container";
import { makeAdminRoute } from "../infrastructure/web/routes/AdminRoute";

export const setupRoutes = (app: Express, container: Container) => {
    // const studentRoute = makeStudentRoute(container.studentController);
    app.use('/api/student', makeStudentRoute(container.studentController));
    app.use('/api/admin', makeAdminRoute(container.adminController));
}

