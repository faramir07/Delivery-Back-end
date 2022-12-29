"use strict";
import {
  DeliveryModelType,
  StateTypeDelivery,
} from "../types/interfaceDelivery";
import { Model, UUIDV4 } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class UserDelivery
    extends Model<DeliveryModelType>
    implements DeliveryModelType
  {
    id!: string;
    firstname!: string;
    lastname!: string;
    email!: string;
    password!: string;
    address!: string;
    state!: StateTypeDelivery;
    age!: number;
    ci!: number;
    rol!: "delivery";
    phome!: number;
    base!: number;
    login!: boolean;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      UserDelivery.hasMany(models.Services, { foreignKey: "userDSer_id" });
      UserDelivery.hasMany(models.ImageEvidences, {
        foreignKey: "userDImg_id",
      });
    }
  }
  UserDelivery.init(
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
          validator: (value: string) => {
            const enums = ["active", "pending", "locked", "inactive"];
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
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "delivery",
      },
      phome: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      base: {
        type: DataTypes.INTEGER,
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
      modelName: "UserDelivery",
    }
  );
  return UserDelivery;
};
