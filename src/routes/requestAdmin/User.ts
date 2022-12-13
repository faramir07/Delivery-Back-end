import { Router } from "express";
import { alldeliveryUser, deliveryId } from "../../controller/requestDelivery";
import { authAdmin } from "../../controller/auth/authUser";

const router = Router();

router.get("/alldelivery", async (req, res, next) => {
  const token = req.header("x-access-token");
  try {
    const resulAuth = await authAdmin(token);
    if(!resulAuth){
      throw new Error("lo siento algo salio mal");
    }
    const allUserDelivery = await alldeliveryUser();
    res.status(200).json(allUserDelivery);
  } catch (error: any) {
    error = { status: 403, error: error.message };
    next(error);
  }
});

router.get("/delivery/:id", async (req, res, next) => {
  const token = req.header("x-access-token");
  const deliveryUserId = req.params.id;
  try {
    const resulAuth = await authAdmin(token);
    if(!resulAuth){
      throw new Error("lo siento algo saliomal");
    }
    const deliveryresult = await deliveryId(deliveryUserId);
    res.status(200).json(deliveryresult);
  } catch (error: any) {
    error = { status: 403, error: error.message };
    next(error);
  }
})

export default router;
