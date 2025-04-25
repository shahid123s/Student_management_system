import express from "express";
import { config } from 'dotenv'
import { connectToDatabase } from "../config/database";
import { createContainer } from "./container";
import { setupRoutes } from "./routes";
import cors from 'cors'
import morgan from 'morgan'

config();

const startServer = async () : Promise<void> => {
    const app = express();
    app.use(express.json());

    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/";
    await connectToDatabase(mongoUri);


    const container = createContainer();

    app.use(cors(container.corsService.getCorsOptions()));
    app.use(morgan('dev'));
    setupRoutes(app, container);

    const PORT = process.env.PORT || 3009;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Error starting the server:", error);
    process.exit(1);
});
