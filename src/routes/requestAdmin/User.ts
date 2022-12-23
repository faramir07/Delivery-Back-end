import { Router } from "express";
import { allDeliveryUser, deliveryId, deliveryName } from "../../controller/requestAdmin/requestDelivery";
import { authAdmin } from "../../middleware/authUsers";
const router = Router();

router.get("/alldelivery", authAdmin, async (_req, res, next) => {
  try {
    const allUserDelivery = await allDeliveryUser();
    res.status(200).json(allUserDelivery);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

router.get("/delivery/:id", authAdmin, async (req, res, next) => {
  const deliveryUserId = req.params.id;
  try {
    const deliveryPerId = await deliveryId(deliveryUserId);
    res.status(200).json(deliveryPerId);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

router.get("/delivery", authAdmin, async (req, res, next) => {
  const { name } = req.query;
  const stringifyName = JSON.stringify(name);
  try {
    const deliveryPerName = await deliveryName(stringifyName)
    res.status(200).json(deliveryPerName)
  } catch (error) {
    console.log(error)
    next()
  }
})

export default router;
