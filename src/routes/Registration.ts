import { Router } from "express";
import {
  registrationClient,
  registrationDelivery,
} from "../controller/registration";

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

export default router;
