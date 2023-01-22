import { Router } from "express";
import {
  signinAdmin,
  signinDelivery,
  signinClient,
} from "../../controller/signinUser";
import {
  checkLoginadmin,
  checkLoginDelivery,
  checkLoginClient,
} from "../../middleware/verifySignin";
const router = Router();

router.post("/userAdmin", checkLoginadmin, async (req, res, next) => {
  const { email } = req.body;
  try {
    const authUsersAdmin = await signinAdmin(email);
    res.json(authUsersAdmin);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

router.post("/userClient", checkLoginClient, async (req, res, next) => {
  const { email } = req.body;
  try {
    const authUsersClient = await signinClient(email);
    res.json(authUsersClient);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

router.post("/userDelivery", checkLoginDelivery, async (req, res, next) => {
  const { email, base } = req.body;
  try {
    const authUserDelivery = await signinDelivery(email, base);
    res.json(authUserDelivery);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

export default router;
