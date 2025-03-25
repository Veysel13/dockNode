import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { getUsers, getUser, getPosts, getPost, getComments, getComment } from "./queries";
import { createUser, updateUser, deleteUser, createPost, updatePost, deletePost, createComment, updateComment, deleteComment } from "./mutations";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUsers,
    getUser,
    getPosts,
    getPost,
    getComments,
    getComment,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser,
    updateUser,
    deleteUser,
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
