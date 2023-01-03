import { Router } from "express";
require("dotenv").config();
import AdminDelivery from "./requestAdmin/Deliverys";
import AdminModerator from "./requestAdmin/Moderators";
import AdminClient from "./requestAdmin/Clients";
import Signup from "./authUser/SignupUsers";
import signin from "../routes/authUser/SigninUsers";
import RegistrationServices from "./RegistrationServices";

const routes = Router();

routes.use("/delivery", AdminDelivery);
routes.use("/moderator", AdminModerator);
routes.use("/client", AdminClient);
routes.use("/signup", Signup);
routes.use("/signin", signin);
routes.use("/addservices", RegistrationServices);

export default routes;
