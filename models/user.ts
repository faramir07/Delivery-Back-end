"use strict";
import { Model, UUIDV4 } from "sequelize";

type RoleType = "admin" | "moderator" | "delivery";
type Statetype = "active" | "pending" | "locked";

interface UserAttrybutes {
  id: string;
  firstname: string;
  lastname: string;
  ci: number;
  password: string;
  state: Statetype;
  role: RoleType;
  imgface: string;
  imgci: string;
  imgtt: string;
  address: string;
  age: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttrybutes> implements UserAttrybutes {
    id!: string;
    firstname!: string;
    lastname!: string;
    ci!: number;
    password!: string;
    state!: Statetype;
    role!: RoleType;
    imgface!: string;
    imgci!: string;
    imgtt!: string;
    address!: string;
    age!: number;
    email!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      // define association here
    }
  }
  User.init(
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
      role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["admin", "moderator", "delivery"],
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
        allowNull: false,
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
      modelName: "User",
    }
  );
  return User;
};
