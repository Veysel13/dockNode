import { DataTypes, Model, Optional, HasManyGetAssociationsMixin } from "sequelize";
import { sequelize } from "./sequelize";
import Permission from "./permission";

interface RoleAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RoleCreationAttributes extends Optional<RoleAttributes,  "id" | "createdAt" | "updatedAt"> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public permissions?: Permission[];

  public getPermissions!: HasManyGetAssociationsMixin<Permission>;

  static associate() {
  
  }
}

Role.init(
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
    tableName: "roles",
    modelName: "Role",
  }
);


export default Role;
