"use strict";
import { Model, UUIDV4 } from "sequelize";

type Statetype = "active" | "locked";

interface UserAttrybutesClient {
  id: string;
  firstname: string;
  lastname: string;
  ci: number;
  password: string;
  state: Statetype;
  address: string;
  age: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class User_client
    extends Model<UserAttrybutesClient>
    implements UserAttrybutesClient
  {
    id!: string;
    firstname!: string;
    lastname!: string;
    ci!: number;
    password!: string;
    state!: Statetype;
    address!: string;
    age!: number;
    email!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      // define association here
    }
  }
  User_client.init(
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
      ci: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["active", "pending", "locked"],
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User_client",
    }
  );
  return User_client;
};
