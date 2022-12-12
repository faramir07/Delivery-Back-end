import { Router } from "express";
import {
  signinAdmin,
  signinDelivery,
  signinClient,
} from "../../controller/auth/verifySignin";
const router = Router();

router.post("/userAdmin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const authUsersAdmin = await signinAdmin(password, email);
    res.json(authUsersAdmin);
  } catch (error: any) {
    error = { status: 401, error: error.message };
    next(error);
  }
});

router.post("/userClient", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const authUsersClient = await signinClient(password, email);
    res.json(authUsersClient);
  } catch (error: any) {
    error = { status: 401, error: error.message };
    next(error);
  }
});

router.post("/userDelivery", async (req, res, next) => {
  const { email, password, base } = req.body;
  try {
    const authUserDelivery = await signinDelivery(password, email, base);
    res.json(authUserDelivery);
  } catch (error: any) {
    error = { status: 401, error: error.message };
    next(error);
  }
});

export default router;
