import express from "express";
import apiRoutes from "./api/index.js";
import mongoDbConnect from './api/utils/database.js'
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || "3000";
const DATABASE_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

//enabling middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Connection with Database
mongoDbConnect(DATABASE_URI);

//Enabling CORS
app.use(cors());

//Loading all Routes
app.use("/api", apiRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}...`)
})