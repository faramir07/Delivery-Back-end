import { Router } from "express";
import { authAdmin } from "../../middleware/authUsers";
import {
  ServiceNameClient,
  serviceAssigned,
  serviceToAssign,
} from "../../controller/requestService/service";

const router = Router();

// todos los servicios activos
router.get("/pending", authAdmin, async (_req, res, next) => {
  try {
    const allServicesPending = await serviceToAssign();
    if (typeof allServicesPending === "string") {
      res.status(400).send({ error: allServicesPending });
    } else res.status(200).json(allServicesPending);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

router.get("/assigned", authAdmin, async (_req, res, next) => {
  try {
    const allServiceAssigned = await serviceAssigned();
    if (typeof allServiceAssigned === "string") {
      res.status(400).send({ error: allServiceAssigned });
    } else res.status(200).json(allServiceAssigned);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

router.get("/search/:client", authAdmin, async (req, res, next) => {
  const { nameClient } = req.query;
  try {
    const ServiceClient = await ServiceNameClient(nameClient as string);
    if (typeof ServiceClient === "string") {
      res.status(404).send({ error: ServiceClient });
    } else res.status(200).json(ServiceClient);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

export default router;
