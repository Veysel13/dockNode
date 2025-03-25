import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import { PostType } from "./postType";
import Post from "../../models/post";
import DataLoader from "dataloader";
import { getRequestedFields } from "../../helpers/util";
import { Container } from "../../provider/repository-service-provider";
import { IPostService } from "../../services/abstract/IPostService";

type PostLoaderKey = { userId: number; fields: string[] };

const postLoader = new DataLoader<PostLoaderKey, Post[] | null>(async (keys:any) => {
  
    const userIds       = keys.map((k:any) => k.userId);
    const uniqueUserIds = [...new Set(userIds)];  
    
    const requestedFields = keys.length > 0 ? keys[0].fields : undefined; 
  
    const postService = Container.resolve<IPostService>("PostService");

    const posts = await postService.get({userIds:Array.from(uniqueUserIds).map(Number)}, requestedFields);

    return userIds.map((id:number) => posts?.filter((post) => post.userId === id) ?? null);
  });

export const UserType:any = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (parent, _, context, info) => {
        const requestedFields = new Set(getRequestedFields(info, "Post"));
        requestedFields.add("id");
        requestedFields.add("userId");

        return postLoader.load({ userId: parent.id, fields: Array.from(requestedFields) })
      },
      /*resolve: (parent) => postLoader.load(parent.id),
      /*resolve: async (parent) => {
        return await Post.findAll({ where: { userId: parent.id } });
      },*/
    },
  }),
});
