import { Router } from "express";
require("dotenv").config();
import AdminDelivery from "./requestAdmin/Deliverys";
import AdminModerator from "./requestAdmin/Moderators";
import AdminClient from "./requestAdmin/Clients";
import Signup from "./authUser/SignupUsers";
import signin from "../routes/authUser/SigninUsers";
import AddServicesAdmin from "./requestAdmin/AddServices";
import ServiceAdmin from "./requestAdmin/service"

const routes = Router();

routes.use("/delivery", AdminDelivery);
routes.use("/moderator", AdminModerator);
routes.use("/client", AdminClient);
routes.use("/addservices", AddServicesAdmin);
routes.use("/service", ServiceAdmin)
routes.use("/signup", Signup);
routes.use("/signin", signin);

export default routes;
