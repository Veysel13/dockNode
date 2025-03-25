import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import { CommentType } from "./commentType";
import { UserType } from "./userType";
import User from "../../models/user";
import Comment from "../../models/comment";
import DataLoader from "dataloader";
import { getRequestedFields } from "../../helpers/util";
import { ICommentRepository } from "../../repository/abstract/ICommentRepository";
import { Container } from "../../provider/repository-service-provider";
import { IUserService } from "../../services/abstract/IUserService";

type CommentLoaderKey = { postId: number; fields: string[] };
type UserLoaderKey = { userId: number; fields: string[] };

const commentLoader = new DataLoader<CommentLoaderKey, Comment[] | null>(async (keys:any) => {
  const postIds       = keys.map((k:any) => k.postId);
  const uniquePostIds = [...new Set(postIds)];

  const requestedFields = keys.length > 0 ? keys[0].fields : undefined;

  const commentService = Container.resolve<ICommentRepository>("CommentService");

  const comments = await commentService.get({postIds:Array.from(uniquePostIds).map(Number)}, requestedFields);

  return postIds.map((id:number) => comments?.filter((comment) => comment.postId === id) ?? null);
});

const userLoader = new DataLoader<UserLoaderKey, User | null>(async (keys:any) => {
  
  const userIds       = keys.map((k:any) => k.userId);
  const uniqueUserIds = [...new Set(userIds)];  
  
  const requestedFields = keys.length > 0 ? keys[0].fields : undefined;   

  const userService = Container.resolve<IUserService>("UserService");

  const users = await userService.get({ids:Array.from(uniqueUserIds).map(Number)}, requestedFields);

  const userMap = new Map(users?.map(user => [user.id, user]));

  return userIds.map((id:number) => userMap.get(id) || null);
});

export const PostType:any = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    userId: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve: (parent, _, context, info) => {
        const requestedFields = new Set(getRequestedFields(info, "User"));
        requestedFields.add("id");
        return userLoader.load({ userId: parent.userId, fields: Array.from(requestedFields) });
      },
      /*resolve: async (parent) => {
        return await User.findByPk(parent.userId);
      },*/
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: (parent, _, context, info) => {
        const requestedFields = new Set(getRequestedFields(info, "Comment"));
        requestedFields.add("postId");
        return commentLoader.load({ postId: parent.id, fields: Array.from(requestedFields) })
      },
      /*resolve: async (parent) => commentLoaderOld.load(parent.id)
      /*resolve: async (parent) => {
        return await Comment.findAll({ where: { postId: parent.id } });
      },*/
    },
  }),
});
