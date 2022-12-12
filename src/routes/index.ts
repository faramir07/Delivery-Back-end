import { Router } from "express";
require("dotenv").config();
import User from "./requestAdmin/User";
import Registration from "./authUser/SignupUsers";
import RegistrationServices from "./RegistrationServices";
import signin from "../routes/authUser/SigninUsers"


const routes = Router();

routes.use("/user", User);
routes.use("/signup", Registration);
routes.use("/signin", signin)
routes.use("/addservices", RegistrationServices);

export default routes;
