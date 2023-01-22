"user strict";
import {
  ServiceModelType,
  Statetype,
  TypePaymentType,
  TypeServiceType,
} from "../types/interfaceService";
import { Model, UUIDV4 } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class Services extends Model<ServiceModelType> implements ServiceModelType {
    id!: string;
    value!: number;
    typepayment!: TypePaymentType;
    typeservice!: TypeServiceType;
    state!: Statetype;
    profit!: number;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      Services.hasMany(models.StateServices, { foreignKey: "stateSer_id" });
      Services.belongsTo(models.UserAdmin, { foreignKey: "userASer_id" });
      Services.belongsTo(models.UserClient, { foreignKey: "userCSer_id" });
      Services.belongsTo(models.UserDelivery, { foreignKey: "userDSer_id" });
    }
  }

  Services.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typepayment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validator: (value: string) => {
            const enums = ["cash", "transfer"];
            if (!enums.includes(value)) {
              throw new Error("no es una opción válida");
            }
          },
        },
      },
      typeservice: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validator: (value: string) => {
            const enums = ["going", "round trip"];
            if (!enums.includes(value)) {
              throw new Error("no es una opción válida");
            }
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
          validator: (value: string) => {
            const enums = ["pending", "assigned", "cancelled", "finished"];
            if (!enums.includes(value)) {
              throw new Error("no es una opción válida");
            }
          },
        },
      },
      profit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Services",
    }
  );
  return Services;
};
