import { Router } from "express";
import {
  registrationClient,
  registrationDelivery,
  registrationAdmins,
} from "../controller/registrationUsers";

const router = Router();

// ruta registro de un nuevo cliente --------------------------------
router.post("/client", async (req, res, next) => {
  const { firstname, lastname, email, password, address, age, ci, phome } =
    req.body;
  try {
    const controllerUser = await registrationClient(
      firstname,
      lastname,
      email,
      password,
      address,
      age,
      ci,
      phome
    );
    res.json(controllerUser);
  } catch (error: any) {
    error = { status: 400, error: error.message };
    next(error);
  }
});

// ruta registro de un nuevo delivery --------------------------------
router.post("/delivery", async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    address,
    age,
    ci,
    phome,
    imagename,
    image,
    imagetype,
  } = req.body;
  try {
    const controllerDelivery = await registrationDelivery(
      firstname,
      lastname,
      email,
      password,
      address,
      age,
      ci,
      phome,
      imagename,
      image,
      imagetype
    );
    res.json(controllerDelivery);
  } catch (error: any) {
    error = { status: 400, error: error.message };
    next(error);
  }
});

// ruta registro de un nuevo admin --------------------------------
router.post("/admin", async (req, res, next) => {
  const { firstname, lastname, email, password, age, ci, phome, rol } =
    req.body;
  try {
    const controllerAdmin = await registrationAdmins(
      firstname,
      lastname,
      email,
      password,
      age,
      ci,
      phome,
      rol
    );
    res.json(controllerAdmin);
  } catch (error: any) {
    error = { status: 400, error: error.message };
    next(error);
  }
});

export default router;
