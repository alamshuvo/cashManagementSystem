import express, { Application } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundRoute from "./app/middleware/notFoundRoute";
import router from "./app/routes";

const app: Application = express();

// parsers
// 'https://carstore-frontend.vercel.app'
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
// app.use(cookieParser());

app.use("/", router);
app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
