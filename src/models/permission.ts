import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./sequelize";

interface PermissionAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes,  "id" | "createdAt" | "updatedAt"> {}

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
  
  }
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "permissions",
    modelName: "Permission",
  }
);

export default Permission;
