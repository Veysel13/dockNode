import { GraphQLList, GraphQLInt, GraphQLString } from "graphql";
import { UserType } from "../types/userType";
import { IUserService } from "../../services/abstract/IUserService";
import { Container } from "../../provider/repository-service-provider";
import { getRequestedFields } from "../../helpers/util";

export const getUsers = {
  type: new GraphQLList(UserType),
  args: {
    email: { type: GraphQLString },
  },
  resolve: async (_:unknown, args:{ email?:string }, context: any, info: any) => {

    const whereClause = args.email ? { email: args.email } : {};

    const requestedFields = new Set(getRequestedFields(info, "User"));
    requestedFields.add("id");

    const userService = Container.resolve<IUserService>("UserService");
    return await userService.get(whereClause, Array.from(requestedFields));
  }
};

export const getUser = {
  type: UserType,
  args: { id: { type: GraphQLInt } },
  resolve: async (_:unknown, args:{ id:any }) => {
    const userService = Container.resolve<IUserService>("UserService");
    return await userService.findById(args.id);
  },
};
