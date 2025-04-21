
import { emitter } from "../events/emitter";
import User from "../models/user";

export const UserObserver = () => {
  User.addHook("afterCreate", (user: any) => {
    emitter.emit("user:created", user);
  });

  User.addHook("afterUpdate", (user: any) => {
    emitter.emit("user:updated", user);
  });

  User.addHook("afterDestroy", (user: any) => {
    emitter.emit("user:deleted", user);
  });
};
