import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import { PostType } from "./postType";
import DataLoader from "dataloader";
import { IPostService } from "../../services/abstract/IPostService";
import { Container } from "../../provider/repository-service-provider";
import Post from "../../models/post";
import { getRequestedFields } from "../../helpers/util";

const getPostService = (): IPostService => Container.resolve<IPostService>("PostService");

type PostLoaderKey = { postId: number; fields: string[] };

const postLoader = new DataLoader<PostLoaderKey, Post | null>(async (keys:any) => {
  
  const postIds       = keys.map((k:any) => k.postId);
  const uniquePostIds = [...new Set(postIds)];  
  
  const requestedFields = keys.length > 0 ? keys[0].fields : undefined;   

  const posts = await getPostService().get({ids:Array.from(uniquePostIds).map(Number)}, requestedFields);

  const postMap = new Map(posts?.map(post => [post.id, post]));

  return postIds.map((id:number) => postMap.get(id) || null);
});

export const CommentType:any = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLInt },
    description: { type: GraphQLString },
    rating: { type: GraphQLInt },
    postId: { type: GraphQLInt },
    post: {
      type: PostType,
      resolve: (parent, _, context, info) => {
        const requestedFields = new Set(getRequestedFields(info, "Post"));
        requestedFields.add("id");
        return postLoader.load({ postId: parent.postId, fields: Array.from(requestedFields) });
      }
    },
  }),
});
