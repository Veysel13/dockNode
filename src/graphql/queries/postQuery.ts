import { GraphQLList, GraphQLInt, GraphQLString } from "graphql";
import { PostType } from "../types/postType";
import { currentUser } from "../../http/middlewares/current-user";
import { requireAuth } from "../../http/middlewares/require-auth";
import { checkPermission } from "../../http/middlewares/check-permission";
import { IPostService } from "../../services/abstract/IPostService";
import { Container } from "../../provider/repository-service-provider";
import { getRequestedFields } from "../../helpers/util";

const getPostService = (): IPostService => Container.resolve<IPostService>("PostService");

export const getPosts = {
  type: new GraphQLList(PostType),
  args: {
      userId: { type: GraphQLString },
    },
  resolve: async (_: unknown, args:{ userId: number }, context:any, info: any) => {
    
    await currentUser(context.req, context.res, () => {});
    await requireAuth(context.req, context.res, () => {});
    await checkPermission('post.view');
    
    const whereClause = args.userId ? { userId: args.userId } : {};

    const requestedFields = new Set(getRequestedFields(info, "Post"));
    requestedFields.add("id");
    requestedFields.add("userId");

    return await getPostService().get(whereClause, Array.from(requestedFields));
  },
};

export const getPost = {
  type: PostType,
  args: { id: { type: GraphQLInt } },
  resolve: async (_:unknown, args:{ id:any }, context:any) => {
    await currentUser(context.req, context.res, () => {});
    await requireAuth(context.req, context.res, () => {});
    await checkPermission('post.view');

    return await getPostService().findById(args.id);
  },
};
