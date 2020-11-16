import express, {
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from "express";
import router from "./routes";

const app = express();
const PORT = 3000;

app.use(json({ strict: false }));
app.use(urlencoded({ extended: false }));
app.use("/api", router);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    error: 404,
    msg: "Unable to find the requested resource or method not available",
  });
});
// Handle errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`⚡️${err.stack}`);
  res.status(400).send({
    error: 400,
    msg: err.message,
  });
});

const server = app.listen(PORT, () => {
  return console.log(`✓ Server is listening on ${PORT}`);
});

server.on("error", (err) => {
  console.log(`⚡️Error happened: ${err.message}`);
});

export default server;
