import { Router } from "express";
import { deliveryUser } from "../../controller/allUserDelivery"

const router = Router();

router.get('/alldelivery/:id', async (req, res, net) =>{
  const { id } = req.params
  try {
    const allUserDelivery = deliveryUser(id)
    res.status(200).json(allUserDelivery)
  } catch (error: any) {
    error = { status: 403, error: error.message };
    net(error)
  }
})

export default router