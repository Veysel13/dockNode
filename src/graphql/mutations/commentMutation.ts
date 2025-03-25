import { GraphQLString, GraphQLInt } from "graphql";
import { CommentType } from "../types/commentType";
import { ICommentService } from "../../services/abstract/ICommentService";
import { Container } from "../../provider/repository-service-provider";
import { currentUser } from "../../http/middlewares/current-user";
import { requireAuth } from "../../http/middlewares/require-auth";
import { checkPermission } from "../../http/middlewares/check-permission";

const getCommentService = (): ICommentService => Container.resolve<ICommentService>("CommentService");

export const createComment = {
  type: CommentType,
  args: {
    description: { type: GraphQLString },
    rating: { type: GraphQLInt },
    postId: { type: GraphQLInt },
  },
  resolve: async (_: unknown, args: { description: string; rating: number; postId: number }, context:any) => {
    await currentUser(context.req, context.res, () => {});
    await requireAuth(context.req, context.res, () => {});
    await checkPermission('comment.create');

    return await getCommentService().create(args);
  },
};

export const updateComment = {
  type: CommentType,
  args: {
    id: { type: GraphQLInt },
    description: { type: GraphQLString },
    rating: { type: GraphQLInt },
    postId: { type: GraphQLInt },
  },
  resolve: async (_: unknown, args: {id:number, description: string; rating: number; postId: number }, context:any) => {
    await currentUser(context.req, context.res, () => {});
    await requireAuth(context.req, context.res, () => {});
    await checkPermission('comment.update');

    return await getCommentService().update(args.id, args);
  },
};

export const deleteComment = {
  type: GraphQLString,
  args: { id: { type: GraphQLInt } },
  resolve: async (_: unknown, args: { id: number }, context:any) => {
    await currentUser(context.req, context.res, () => {});
    await requireAuth(context.req, context.res, () => {});
    await checkPermission('comment.delete');

    await getCommentService().delete(args.id);
    return "Comment deleted successfully";
  },
};
