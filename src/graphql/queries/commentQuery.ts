import { GraphQLList, GraphQLInt } from "graphql";
import { CommentType } from "../types/commentType";
import Comment from "../../models/comment";
import { currentUser } from "../../http/middlewares/current-user";
import { requireAuth } from "../../http/middlewares/require-auth";
import { checkPermission } from "../../http/middlewares/check-permission";
import { ICommentService } from "../../services/abstract/ICommentService";
import { Container } from "../../provider/repository-service-provider";

const getCommentService = (): ICommentService => Container.resolve<ICommentService>("CommentService");

export const getComments = {
  type: new GraphQLList(CommentType),
  resolve: async (_: unknown, args:any, context:any, info: any) => {
    await currentUser(context.req, context.res, () => {});
    await requireAuth(context.req, context.res, () => {});
    await checkPermission('comment.view');

    return await getCommentService().all();
  },
};

export const getComment = {
  type: CommentType,
  args: { id: { type: GraphQLInt } },
  resolve: async (_:unknown, args:{ id:any }, context:any) => {
    await currentUser(context.req, context.res, () => {});
    await requireAuth(context.req, context.res, () => {});
    await checkPermission('comment.view');

    return await getCommentService().findById(args.id);
  },
};
