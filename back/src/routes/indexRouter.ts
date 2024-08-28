// import { Express, Router } from "express";
// import appointmentRouter from "./appointmentRouter";
// import usersRouter from "./usersRouter";
// import { getUser, loginUser, registerUser, getUserbyId } from "../controllers/usersController";

// const indexRouter: Router = Router();

// indexRouter.use("/users", getUser);
// indexRouter.use("/appointments", appointmentRouter);

// export default indexRouter;
import express, { Router } from "express";
import appointmentRouter from "./appointmentRouter";
import usersRouter from "./usersRouter";

const indexRouter: Router = express.Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/appointments", appointmentRouter);

export default indexRouter;