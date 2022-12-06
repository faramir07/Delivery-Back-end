"user strict";
import { Model, UUIDV4 } from "sequelize";

type ImagetypeType = "evidence" | "document";
interface ImageEvidencesType {
  id: string;
  imagename: string;
  image: string;
  imagetype: ImagetypeType;
  addressimage: string;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ImageEvidences
    extends Model<ImageEvidencesType>
    implements ImageEvidencesType
  {
    id!: string;
    imagename!: string;
    image!: string;
    imagetype!: ImagetypeType;
    addressimage!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      ImageEvidences.belongsTo(models.StateServices, { foreignKey: 'stateImg_id' });
      ImageEvidences.belongsTo(models.UserDelivery, { foreignKey: 'userDImg_id'});
    }
  }

  ImageEvidences.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      imagename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagetype: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validator: (value: string) => {
            const enums = ["evidence", "document"]
            if(!enums.includes(value)){
              throw new Error("no es una opción válida")
            }
          }
        }
      },
      addressimage: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ImageEvidences",
    }
  );
  return ImageEvidences;
};
