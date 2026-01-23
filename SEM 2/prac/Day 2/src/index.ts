import express, {
    type Response,
    type Request,
    type NextFunction,
} from "express";
const app = express();

app.use(express.json());


app.listen(3000);
