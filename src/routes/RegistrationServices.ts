import { Router } from "express";
import { registrationService } from "../controller/registrationService";

const router = Router();

router.post("/addservice", async (req, res, next) => {
  const {
    typepayment,
    typeservice,
    description,
    profit,
    value,
    address,
    userid,
    rol,
  } = req.body;
  try {
    const newService = await registrationService(
      typepayment,
      typeservice,
      description,
      profit,
      value,
      address,
      userid,
      rol
    );
    res.json(newService);
  } catch (error: any) {
    error = { status: 400, error: error.message };
    next(error);
  }
});

export default router;
