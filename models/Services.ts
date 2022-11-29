"user strict";
import { Model, UUIDV4 } from "sequelize";

type Statetype = "pending" | "assigned" | "cancelled" | "finished";
type Typeservicetype = "going" | "round trip";
type Typepaymenttype = "cash" | "transfer";
interface ServiceType {
  id: string;
  description: string;
  value: number;
  typepayment: Typepaymenttype;
  typeservice: Typeservicetype;
  state: Statetype;
  profit: number;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Services
    extends Model<ServiceType>
    implements ServiceType
  {
    id!: string;
    description!: string;
    value!: number;
    typepayment!: Typepaymenttype;
    typeservice!: Typeservicetype;
    state!: Statetype;
    profit!: number;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      Services.hasMany(models.StateServices);
      Services.belongsTo(models.UserAdmin);
      Services.belongsTo(models.UserClient);
      Services.belongsTo(models.UserDelivery);
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      typepayment: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["cash", "transfer"]
      },
      typeservice: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["going", "round trip"],
      },
      state: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["pending", "assigned", "cancelled", "finished"],
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
