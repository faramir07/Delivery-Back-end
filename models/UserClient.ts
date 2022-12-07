"use strict";
import { Model, UUIDV4 } from "sequelize";

type Statetype = "active" | "locked";
interface UserAttrybutesClient {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  state: Statetype;
  age: number;
  rol: "client";
  ci: number;
  phome: number;
  createdAt: Date;
  updatedAt: Date;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class UserClient
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
    rol!: "client";
    phome!: number;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      UserClient.hasMany(models.Services, { foreignKey: "userCSer_id" });
    }
  }
  UserClient.init(
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
        validate: {
          validator: (value: string) => {
            const enuns = ["active", "pending", "locked"];
            if (!enuns.includes(value)) {
              throw new Error("no es una opción válida");
            }
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "client",
      },
      phome: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserClient",
    }
  );
  return UserClient;
};
