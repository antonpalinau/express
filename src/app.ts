import express, { Application } from "express";
import autoSuggestRouter from "./routes/api/getAutoSuggestUsers";
import usersRouter from "./routes/api/users";

const app: Application = express();

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/getautosuggestusers", autoSuggestRouter);

app.listen(5000, () => {
    console.log("server is running")
});
