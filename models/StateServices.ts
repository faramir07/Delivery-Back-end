"user strict";
import { Model, UUIDV4 } from "sequelize";

interface StateServicesType {
  id: string;
  checkinput: boolean;
  checkoutput: boolean;
  evidence: boolean;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class StateServices
    extends Model<StateServicesType>
    implements StateServicesType
  {
    id!: string;
    checkinput!: boolean;
    checkoutput!: boolean;
    evidence!: boolean;
    address!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      StateServices.hasMany(models.ImageEvidences);
      StateServices.belongsTo(models.Services);
    }
  }

  StateServices.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      checkinput: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      checkoutput: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      evidence: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "StateServices",
    }
  );
  return StateServices;
};
