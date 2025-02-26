import { sequelize } from "./sequelize";
import User from "./user";
import Post from "./post";
import Comment from "./comment";

User.hasMany(Post, { foreignKey: "userId", as: "posts" });

Post.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user'});
Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });

Comment.belongsTo(Post, { foreignKey: 'postId', targetKey: 'id', as: 'post'});


sequelize.sync()
  .then(() => console.log("Database & tables synced!"))
  .catch(err => console.error("Database sync error:", err));