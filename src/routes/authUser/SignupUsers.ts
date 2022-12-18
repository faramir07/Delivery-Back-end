import { Router, Request, Response, NextFunction } from "express";
import {
  registrationClient,
  registrationDelivery,
  registrationAdmins,
} from "../../controller/signupUsers";
import {
  checkEmailAndRolAdmin,
  checkEmailDelivery,
  checkEmailclient,
} from "../../middleware/verifySignUp";

const router = Router();

// ruta registro de un nuevo cliente --------------------------------
router.post(
  "/client",
  checkEmailclient,
  async (req: Request, res: Response, next: NextFunction) => {
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
      console.log(error);
      next(error);
    }
  }
);

// ruta registro de un nuevo delivery --------------------------------
router.post(
  "/delivery",
  checkEmailDelivery,
  async (req: Request, res: Response, next: NextFunction) => {
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
      console.log(error);
      next(error);
    }
  }
);

// ruta registro de un nuevo admin --------------------------------
router.post(
  "/admin",
  checkEmailAndRolAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
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
      console.log(error);
      next(error);
    }
  }
);

export default router;
