import { GraphQLString, GraphQLInt } from "graphql";
import { PostType } from "../types/postType";
import { IPostService } from "../../services/abstract/IPostService";
import { Container } from "../../provider/repository-service-provider";
import postRequestSchema from "../../http/request/post/post-request";
import { handleValidationForGraphql, withAuthAndPermission } from "../../helpers/util";

const getPostService = (): IPostService => Container.resolve<IPostService>("PostService");

export const createPost = {
  type: PostType,
  args: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    userId: { type: GraphQLInt },
  },
  resolve: async (_: unknown, args:{ title: string; description: string },context:any) => {
    await withAuthAndPermission(context.req, context.res, 'post.create');
    handleValidationForGraphql(postRequestSchema, args);
    
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
    await withAuthAndPermission(context.req, context.res, 'post.update');
    handleValidationForGraphql(postRequestSchema, args);
    
    return await getPostService().update(args.id,{ ...args });
  },
};

export const deletePost = {
  type: GraphQLString,
  args: { id: { type: GraphQLInt } },
  resolve: async (_: unknown, args: { id: number },context:any) => {
    await withAuthAndPermission(context.req, context.res, 'post.delete');

    await getPostService().delete(args.id);
    
    return "Post deleted successfully";
  },
};
