import { Router } from "express";
require("dotenv").config();
import User from "./requestAdmin/User";
import Signup from "./authUser/SignupUsers";
import signin from "../routes/authUser/SigninUsers";
import RegistrationServices from "./RegistrationServices";


const routes = Router();

routes.use("/user", User);
routes.use("/signup", Signup);
routes.use("/signin", signin);
routes.use("/addservices", RegistrationServices);

export default routes;
