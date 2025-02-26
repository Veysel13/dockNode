import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './sequelize';
import jwt from "jsonwebtoken";
import { Password } from '../helpers/password';

interface UserAttributes {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public generateToken(): string {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
      },
      process.env.JWT_KEY!,
      { expiresIn: "120h" }
    );
  }

  //user.toJSON()
  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

User.init(
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
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    }
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.password = await Password.toHash(user.password);
        }
      },
    },
  },
  
);

User.addScope('withPassword', {
  attributes: { include: ['password'] },
});

export default User;