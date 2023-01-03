"use strict";
import {
  AdminModelType,
  StateTypeAdmin,
  Roltype,
} from "../types/interfaceModerator";
import { Model, UUIDV4 } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class UserAdmin
    extends Model<AdminModelType>
    implements AdminModelType
  {
    id!: string;
    firstname!: string;
    lastname!: string;
    email!: string;
    password!: string;
    state!: StateTypeAdmin;
    age!: number;
    ci!: number;
    phome!: number;
    rol!: Roltype;
    login!: boolean;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      UserAdmin.hasMany(models.Services, { foreignKey: "userASer_id" });
    }
  }

  UserAdmin.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "inactive",
        validate: {
          validator: (value: string) => {
            const enums = ["active", "locked", "inactive"];
            if (!enums.includes(value)) {
              throw new Error("no es una opción válida");
            }
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ci: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phome: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validator: (value: string) => {
            const enums = ["admin", "moderator"];
            if (!enums.includes(value)) {
              throw new Error("no es una opción válida");
            }
          },
        },
      },
      login: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserAdmin",
    }
  );
  return UserAdmin;
};
