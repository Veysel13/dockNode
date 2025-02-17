import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import Post from "./post";

interface CommentAttributes {
  id: number;
  description: string;
  rating: number;
  postId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CommentCreationAttributes extends Optional<CommentAttributes,  "id" | "createdAt" | "updatedAt"> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public description!: string;
  public rating!: number;
  public postId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Comment.belongsTo(Post, { foreignKey: "post_id",targetKey:"id", as: "post" });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      field: "post_id",
      allowNull: false,
      references: {
        model: Post,
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
    tableName: "comments",
    modelName: "Comment",
  }
);

export default Comment;