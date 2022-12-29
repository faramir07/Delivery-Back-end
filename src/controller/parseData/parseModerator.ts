import {
  MoreratorResAdminType,
  AdminModelType,
} from "../../../types/interfaceModerator";

// se pasean los datos moderador para Admin
export const parseAdminModerator = (
  moderator: AdminModelType[] | AdminModelType
) => {
  if (Array.isArray(moderator)) {
    const moderatorModel: MoreratorResAdminType[] = moderator.map(
      (moderator: MoreratorResAdminType) => {
        return {
          id: moderator.id,
          firstname: moderator.firstname,
          lastname: moderator.lastname,
          email: moderator.email,
          state: moderator.state,
          age: moderator.age,
          ci: moderator.ci,
          phome: moderator.phome,
          rol: moderator.rol,
          login: moderator.login,
          createdAt: moderator.createdAt,
          updatedAt: moderator.updatedAt,
        };
      }
    );
    return moderatorModel;
  } else
    return {
      id: moderator.id,
      firstname: moderator.firstname,
      lastname: moderator.lastname,
      email: moderator.email,
      state: moderator.state,
      age: moderator.age,
      ci: moderator.ci,
      phome: moderator.phome,
      rol: moderator.rol,
      login: moderator.login,
      createdAt: moderator.createdAt,
      updatedAt: moderator.updatedAt,
    };
};
