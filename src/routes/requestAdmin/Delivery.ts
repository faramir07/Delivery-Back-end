import { Router } from "express";
import {
  allDeliveryUser,
  deliveryId,
  deliveryName,
  deliveryLogin,
} from "../../controller/requestAdmin/requestDelivery";
import { authAdmin } from "../../middleware/authUsers";
const router = Router();

router.get("/search", authAdmin, async (_req, res, next) => {
  try {
    const allUserDelivery = await allDeliveryUser();
    if (typeof allUserDelivery === "string") {
      res.status(404).send({ msg: allUserDelivery });
    } else res.status(200).json(allUserDelivery);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

router.get("/search/id/:id", authAdmin, async (req, res, next) => {
  const deliveryUserId = req.params.id;
  try {
    const deliveryPerId = await deliveryId(deliveryUserId);
    if (typeof deliveryPerId === "string") {
      res.status(404).send({ msg: deliveryPerId });
    } else res.status(200).json(deliveryPerId);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

router.get("/search/firstname", authAdmin, async (req, res, next) => {
  const { firstname } = req.query;
  const stringifyName = JSON.stringify(firstname);
  console.log(stringifyName);
  
  try {
    const deliveryPerName = await deliveryName(stringifyName);
    if (typeof deliveryPerName === "string") {
      res.status(404).send({ msg: deliveryPerName });
    } else res.status(200).json(deliveryPerName);
  } catch (error) {
    console.log(error);
    next();
  }
});

router.get("/search/login", authAdmin, async (_req, res, next) => {  
  try {
    const deliveryPerLogin = await deliveryLogin();
    if (typeof deliveryPerLogin === "string") {
      res.status(404).send({ msg: deliveryPerLogin });
    } else res.status(200).json(deliveryPerLogin);
  } catch (error: any) {
    console.log(error);
    next();
  }
});

export default router;
