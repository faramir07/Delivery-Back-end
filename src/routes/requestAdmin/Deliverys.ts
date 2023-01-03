import { Router } from "express";
import {
  allDeliveryUser,
  deliveryId,
  deliveryName,
  deliveryLogin,
  deliveryUpdate,
} from "../../controller/requestAdmin/requestDelivery";
import { authAdmin } from "../../middleware/authUsers";
const router = Router();

// todos los delivery
router.get("/search", authAdmin, async (_req, res, next) => {
  try {
    const allUserDelivery = await allDeliveryUser();
    if (typeof allUserDelivery === "string") {
      res.status(404).send({ error: allUserDelivery });
    } else res.status(200).json(allUserDelivery);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

// delivery por id
router.get("/search/deliveryid/:id", authAdmin, async (req, res, next) => {
  if (!req.params) res.status(400).send({ error: "el id es requerido" });
  const deliveryUserId = req.params.id;
  try {
    const deliveryPerId = await deliveryId(deliveryUserId);
    if (typeof deliveryPerId === "string") {
      res.status(404).send({ error: deliveryPerId });
    } else res.status(200).json(deliveryPerId);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

// delivery por primer nombre
router.get("/search/firstname", authAdmin, async (req, res, next) => {
  const { firstname } = req.query;

  try {
    const deliveryPerName = await deliveryName(firstname as string);
    if (typeof deliveryPerName === "string") {
      res.status(404).send({ error: deliveryPerName });
    } else res.status(200).json(deliveryPerName);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// delivery logueados
router.get("/search/login", authAdmin, async (_req, res, next) => {
  try {
    const deliveryPerLogin = await deliveryLogin();
    if (typeof deliveryPerLogin === "string") {
      res.status(404).send({ error: deliveryPerLogin });
    } else res.status(200).json(deliveryPerLogin);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

// actualiza los datos del delivery
router.put("/update", authAdmin, async (req, res, next) => {
  const { firstname, lastname, address, state, phome, id, email } = req.body;
  try {
    const deliveryUpdateData = await deliveryUpdate({
      id,
      firstname,
      lastname,
      address,
      state,
      phome,
      email,
    });

    if (typeof deliveryUpdateData === "string") {
      res.status(500).send({ error: deliveryUpdateData });
    } else res.status(200).send({ msg: "datos actualizados con exito" });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

export default router;
