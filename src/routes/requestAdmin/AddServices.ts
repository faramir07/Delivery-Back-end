import { Router } from "express";
import { registrationService } from "../../controller/requestService/service";
import { authAdmin } from "../../middleware/authUsers";

const router = Router();

router.post("/admin", authAdmin, async (req, res, next) => {
  const { typepayment, typeservice, value, poing, clientId, adminId } =
    req.body;
  try {
    const newService = await registrationService({
      typepayment,
      typeservice,
      value,
      poing,
      clientId,
      adminId,
    });
    if (typeof newService === "string") {
      res.status(404).send({ error: newService });
    } else res.status(200).json(newService);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

// router.post("moderator", authModerator, async(req, res, next) => {

// })

export default router;
