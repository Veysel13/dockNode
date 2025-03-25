import { GraphQLString, GraphQLInt } from "graphql";
import { UserType } from "../types/userType";
import { Container } from "../../provider/repository-service-provider";
import { IUserService } from "../../services/abstract/IUserService";
import userRequestSchema from "../../http/request/user/user-request";


const handleValidation = (args: any) => {
  const { error } = userRequestSchema.validate(args);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const getUserService = (): IUserService => Container.resolve<IUserService>("UserService");

export const createUser = {
    type: UserType,
    args: {
      name: { type: GraphQLString },
      lastname: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async (_: unknown, args: { name: string; lastname: string; email: string; password: string }) => {
        
      handleValidation(args);

      return await getUserService().create(args);
    },
  };

  export const updateUser = {
    type: UserType,
    args: {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      lastname: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async (_: unknown, args: { id: number; name?: string; lastname?: string; email?: string; password?: string }) => {
      
      handleValidation(args);

      const userService = getUserService();

      const user = await userService.findById(args.id);
      if (!user) throw new Error("User not found");
  
      return await userService.update(user.id,{
        name: args.name || user.name,
        lastname: args.lastname || user.lastname,
        email: args.email || user.email
      });
    },
  };
  
  export const deleteUser = {
    type: GraphQLString,
    args: { id: { type: GraphQLInt } },
    resolve: async (_: unknown, args: { id: number }) => {
      await getUserService().delete(args.id);
      return "User deleted successfully";
    },
  };
