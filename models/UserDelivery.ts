"use strict";

import { Model, UUIDV4 } from "sequelize";

type StatetypeDeluvery = "active" | "pending" | "locked";

interface UserAttrybutesDelivery {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  state: StatetypeDeluvery;
  age: number;
  ci: number;
  rol: "delivery";
  phome: number;
  base: number;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class UserDelivery
    extends Model<UserAttrybutesDelivery>
    implements UserAttrybutesDelivery
  {
    id!: string;
    firstname!: string;
    lastname!: string;
    email!: string;
    password!: string;
    address!: string;
    state!: StatetypeDeluvery;
    age!: number;
    ci!: number;
    rol!: "delivery";
    phome!: number;
    base!: number;
    createdAt!: Date;
    updatedAt!: Date;

    // static associate(models: any) {

    // }
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
        unique: true
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserDelivery",
    }
  );
  return UserDelivery
};
