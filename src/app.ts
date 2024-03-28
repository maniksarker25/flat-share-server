import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();
app.use(cors());
// parser ----------------------------------------------------------------
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Flat share is available");
});

app.use("/api", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
