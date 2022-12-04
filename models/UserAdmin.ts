"use strict";
import {  Model, UUIDV4 } from "sequelize";

type Statetype = "active" | "locked" | "inactive";
type Roltype = "admin" | "moderator";
interface UserAttrybutesAdmin {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  state: Statetype;
  age: number;
  ci: number;
  phome: number;
  rol: Roltype;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class UserAdmin
    extends Model<UserAttrybutesAdmin>
    implements UserAttrybutesAdmin
  {
    id!: string;
    firstname!: string;
    lastname!: string;
    email!: string;
    password!: string;
    address!: string;
    state!: Statetype;
    age!: number;
    ci!: number;
    phome!: number;
    rol!: Roltype;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      UserAdmin.hasMany(models.Services, { foreignKey: 'useASer_id' });
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["active", "locked", "inactive"],
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
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["admin", "moderator"],
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
