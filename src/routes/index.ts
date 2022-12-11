import { Router } from "express";
require("dotenv").config();
import User from "./User";
import Registration from "./Registration";
import RegistrationServices from "./RegistrationServices";

const routes = Router();

routes.use("/user", User);
routes.use("/registration", Registration);
routes.use("/addservices", RegistrationServices);

export default routes;
