import { sequelize } from "./sequelize";
import User from "./user";
import Post from "./post";
import Comment from "./comment";
import Team from "./team";
import Role from "./role";
import Permission from "./permission";

User.hasMany(Post, { foreignKey: "userId", as: "posts" });

Team.belongsToMany(User, { through: "team_users", foreignKey: "team_id", otherKey: 'user_id', timestamps: false});
User.belongsToMany(Team, { through: "team_users", foreignKey: "user_id", otherKey: 'team_id', timestamps: false});

// User ve Role Many-to-Many
User.belongsToMany(Role, { through: "user_roles", foreignKey: "user_id", otherKey: 'role_id', timestamps: false, as:'roles' });
//Role.belongsToMany(User, { through: "user_roles", foreignKey: "role_id", otherKey: 'user_id', timestamps: false });

// Role ve Permission Many-to-Many
Role.belongsToMany(Permission, { through: "role_permissions", foreignKey:"role_id", otherKey: 'permission_id', timestamps: false, as:'permissions'});
//Permission.belongsToMany(Role, { through: "role_permissions", foreignKey:"permission_id", otherKey: 'role_id', timestamps: false });

// User ve Permission Many-to-Many
User.belongsToMany(Permission, { through: "user_permissions", foreignKey:"user_id", otherKey: 'permission_id', timestamps: false, as:'permissions' });
//Permission.belongsToMany(User, { through: "user_permissions", foreignKey:"permission_id", otherKey: 'user_id', timestamps: false });

Post.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user'});
Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });

Comment.belongsTo(Post, { foreignKey: 'postId', targetKey: 'id', as: 'post'});

sequelize.sync()
  .then(() => console.log("Database & tables synced!"))
  .catch(err => console.error("Database sync error:", err));