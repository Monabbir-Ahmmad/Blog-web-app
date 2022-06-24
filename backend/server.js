import express from "express";
import cors from "cors";
import http from "http";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import userRouter from "./src/routes/userRoutes.js";
import blogRouter from "./src/routes/blogRoutes.js";
import dotenv from "dotenv";
import { databaseConnect } from "./src/config/databaseConfig.js";
import seedDatabase from "./seedDatabase.js";
import authRouter from "./src/routes/authRoutes.js";

const app = express();

const server = http.createServer(app);

dotenv.config();

databaseConnect();

app.use(cors());

app.use(express.json());

app.use(express.static("./public/uploads"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/blog", blogRouter);

app.use(errorMiddleware.notFound);

app.use(errorMiddleware.errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);

seedDatabase();
