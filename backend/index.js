import express from "express";
import cors from "cors";
import http from "http";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import dotenv from "dotenv";
import { database } from "./config/database.js";
import seedDatabase from "./seedDatabase.js";

const app = express();

const server = http.createServer(app);

dotenv.config();

database
  .authenticate()
  .then(() => console.log("Connected to database..."))
  .catch((error) => console.error("Unable to connect to the database:", error));

app.use(cors());

app.use(express.json());

app.use(express.static("./public/uploads"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/v1/user", userRouter);

app.use("/api/v1/blog", blogRouter);

app.use(notFound);

app.use(errorHandler);

seedDatabase();

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
