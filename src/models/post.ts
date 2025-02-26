import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "./sequelize";
import User from "./user";

interface PostAttributes {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PostCreationAttributes extends Optional<PostAttributes,  "id" | "createdAt" | "updatedAt"> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
  
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
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
    tableName: "posts",
    modelName: "Post",
  }
);

//Post.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'users'});

export default Post;
