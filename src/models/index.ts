import { sequelize } from "./sequelize";
import User from "./user";
import Post from "./post";
import Comment from "./comment";
import Team from "./team";

User.hasMany(Post, { foreignKey: "userId", as: "posts" });

Team.belongsToMany(User, { through: "team_users", foreignKey: "team_id", otherKey: 'team_id', timestamps: false});
User.belongsToMany(Team, { through: "team_users", foreignKey: "user_id", otherKey: 'team_id', timestamps: false});

Post.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user'});
Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });

Comment.belongsTo(Post, { foreignKey: 'postId', targetKey: 'id', as: 'post'});

sequelize.sync()
  .then(() => console.log("Database & tables synced!"))
  .catch(err => console.error("Database sync error:", err));