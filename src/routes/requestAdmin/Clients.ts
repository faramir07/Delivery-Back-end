import { Router } from "express";
import { authAdmin } from "../../middleware/authUsers";
import {
  allClietUser,
  clientId,
  clientName,
  clientUpdate,
} from "../../controller/requestAdmin/requestClient";
const router = Router();

// todos los clientes
router.get("/search", authAdmin, async (_req, res, next) => {
  try {
    const allUserClient = await allClietUser();
    if (typeof allUserClient === "string") {
      res.status(404).send({ error: allUserClient });
    } else res.status(200).json(allUserClient);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

// clientes por id
router.get("/search/clientid/:id", authAdmin, async (req, res, next) => {
  if (!req.params) res.status(400).send({ error: "el id es requerido" });
  const clientUserId = req.params.id;
  try {
    const clientPerId = await clientId(clientUserId);
    if (typeof clientPerId === "string") {
      res.status(404).send({ error: clientPerId });
    } else res.status(200).json(clientPerId);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

router.get("/search/firstname", authAdmin, async (req, res, next) => {
  const { firstname } = req.query;

  try {
    const clientPerName = await clientName(firstname as string);
    if (typeof clientPerName === "string") {
      res.status(404).send({ error: clientPerName });
    } else res.status(200).json(clientPerName);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

router.put("/update", authAdmin, async (req, res, next) => {
  const { firstname, lastname, email, address, state, age, ci, phome, id } =
    req.body;
  try {
    const clientUpdateData = await clientUpdate({
      firstname,
      lastname,
      email,
      address,
      state,
      age,
      ci,
      phome,
      id,
    });

    if (typeof clientUpdateData === "string") {
      res.status(404).send({ error: clientUpdateData });
    } else res.status(200).send({ msg: "datos actualizados con exito" });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

export default router;
