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
  imgface: string;
  imgci: string;
  imgtt: string;
  ci: number;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User_delivery
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
    imgface!: string;
    imgci!: string;
    imgtt!: string;
    ci!: number;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {}
  }
  User_delivery.init(
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgface: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgci: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgtt: {
        type: DataTypes.STRING,
      },
      ci: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User_delivery",
    }
  );
};
