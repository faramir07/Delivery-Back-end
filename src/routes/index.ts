import { Router } from "express";
require("dotenv").config();
import Delivery from "./requestAdmin/Delivery";
import Signup from "./authUser/SignupUsers";
import signin from "../routes/authUser/SigninUsers";
import RegistrationServices from "./RegistrationServices";


const routes = Router();

routes.use("/delivery", Delivery);
routes.use("/signup", Signup);
routes.use("/signin", signin);
routes.use("/addservices", RegistrationServices);

export default routes;
