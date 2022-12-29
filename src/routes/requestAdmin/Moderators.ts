import { Router } from "express";
import { authAdmin } from "../../middleware/authUsers";
import {
  allModeratorUser,
  moderatorId,
  moderatorName,
  moderatorLogin,
  moderatosUpdate,
} from "../../controller/requestAdmin/requestModerator";

const router = Router();

// todos los moderadores
router.get("/search", authAdmin, async (_req, res, next) => {
  try {
    const allUserModerator = await allModeratorUser();
    if (typeof allUserModerator === "string") {
      res.status(404).send({ msg: allUserModerator });
    } else res.status(200).json(allUserModerator);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

// oderadoeres por id
router.get("/search/id/:id", authAdmin, async (req, res, next) => {
  const moderatorUserId = req.params.id;
  try {
    const moderatorPerId = await moderatorId(moderatorUserId);
    if (typeof moderatorPerId === "string") {
      res.status(404).send({ msg: moderatorPerId });
    } else res.status(200).json(moderatorPerId);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

// moderadores por el primer nombre
router.get("/search/firstname", authAdmin, async (req, res, next) => {
  const { firstname } = req.query;
  const stringifyName = JSON.stringify(firstname);

  try {
    const moderatorPerName = await moderatorName(stringifyName);
    if (typeof moderatorPerName === "string") {
      res.status(404).send({ msg: moderatorPerName });
    } else res.status(200).json(moderatorPerName);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

// moderadores logueados
router.get("/search/login", authAdmin, async (_req, res, next) => {
  try {
    const moderatorPerLogin = await moderatorLogin();
    if (typeof moderatorPerLogin === "string") {
      res.status(404).send({ msg: moderatorLogin });
    } else res.status(200).json(moderatorLogin);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

router.put("/update", authAdmin, async (req, res, next) => {
  const { firstname, lastname, email, state, age, ci, phome, rol, id } = req.body;
  try {
    const moderatorUpdateValue = await moderatosUpdate({
      id,
      firstname,
      lastname,
      email,
      state,
      age,
      ci,
      phome,
      rol,
    });

    if (typeof moderatorUpdateValue === "string") {
      res.status(500).send({ msg: moderatorUpdateValue });
    } else res.status(200).send("datos actualizados con exito");
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

export default router;
