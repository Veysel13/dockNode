
import { emitter } from "../events/emitter";
import Post from "../models/post";

export const PostObserver = () => {
  Post.addHook("afterCreate", (post: any) => {
    emitter.emit("post:created", post);
  });

  Post.addHook("afterUpdate", (post: any) => {
    emitter.emit("post:updated", post);
  });

  Post.addHook("afterDestroy", (post: any) => {
    emitter.emit("post:deleted", post);
  });
};
