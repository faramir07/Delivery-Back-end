import { Router } from "express";
import { registration } from "../controller/registrationClient"

const router = Router();

router.post("/cliente", async (req, res) => {
  const { firstname, lastname, email, password, address, age, ci, phome } = req.body;
  try {
    const controllerUser = await registration(firstname, lastname, email, password, address, age, ci, phome);
    res.json(controllerUser);
  } catch (error: any) {
    res.status(500).json({error: error.message})
  }
});

export default router;
