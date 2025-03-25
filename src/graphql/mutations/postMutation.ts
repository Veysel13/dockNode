import { GraphQLString, GraphQLInt, GraphQLFieldResolver } from "graphql";
import { PostType } from "../types/postType";
import { IPostService } from "../../services/abstract/IPostService";
import { Container } from "../../provider/repository-service-provider";
import postRequestSchema from "../../http/request/post/post-request";
import { currentUser } from "../../http/middlewares/current-user";
import { requireAuth } from "../../http/middlewares/require-auth";
import { checkPermission } from "../../http/middlewares/check-permission";

const handleValidation = (args: any) => {
  const { error } = postRequestSchema.validate(args);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const getPostService = (): IPostService => Container.resolve<IPostService>("PostService");

export const createPost = {
  type: PostType,
  args: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    userId: { type: GraphQLInt },
  },
  resolve: async (_: unknown, args:{ title: string; description: string },context:any) => {
    handleValidation(args);
    
    await currentUser(context.req, context.res, () => {});
    await requireAuth(context.req, context.res, () => {});
    await checkPermission('post.create');

    const userId = context.req.currentUser.id;
    
    return await getPostService().create({ ...args, userId });
  },
};

export const updatePost = {
  type: PostType,
  args: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    userId: { type: GraphQLInt },
  },
  resolve: async (_: unknown, args:{id: number, title: string; description: string },context:any) => {
    handleValidation(args);
    
    await currentUser(context.req, context.res, () => {});
    await requireAuth(context.req, context.res, () => {});
    await checkPermission('post.update');

    //const userId = context.req.currentUser.id;
    
    return await getPostService().update(args.id,{ ...args });
  },
};

export const deletePost = {
  type: GraphQLString,
  args: { id: { type: GraphQLInt } },
  resolve: async (_: unknown, args: { id: number },context:any) => {

    await currentUser(context.req, context.res, () => {});
    await requireAuth(context.req, context.res, () => {});
    await checkPermission('post.delete');

    await getPostService().delete(args.id);
    return "Post deleted successfully";
  },
};
