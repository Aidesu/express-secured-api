import express from "express";
import helmet from "helmet";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes.js";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", cors(), usersRoutes);

app.listen(PORT, () => console.log("Server start on port " + PORT));
