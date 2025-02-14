import userRequest from "./user/user-request";
import { ObjectSchema } from "joi"; // Joi şema tipi

// Tüm şemaları burada topluyoruz
const schemas: Record<string, ObjectSchema> = {
  userRequest: userRequest,
};

export default schemas;
