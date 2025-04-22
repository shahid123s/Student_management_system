import {Express} from "express";
import { makeStudentRoute } from "../infrastructure/web/routes/StudentRoute";
import { Container } from "./container";

export const setupRoutes = (app: Express, container: Container) => {
    // const studentRoute = makeStudentRoute(container.studentController);
    app.use('/api/student', makeStudentRoute(container.studentController));
}

