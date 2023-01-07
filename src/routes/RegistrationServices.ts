import { Router } from "express";
import { registrationService } from "../controller/registrationService";

const router = Router();

router.post("/addservice", async (req, res, next) => {
  const {
    typepayment,
    typeservice,
    value,
    poing,
    userid,
  } = req.body;
  try {
    const newService = await registrationService(
      typepayment,
      typeservice,
      value,
      poing,
      userid,
    );
    res.json(newService);
  } catch (error: any) {
    error = { status: 400, error: error.message };
    next(error);
  }
});

export default router;
