import { UserObserver } from "./UserObserver";
import { PostObserver } from "./PostObserver";

export const registerObservers = () => {
  UserObserver();
  PostObserver();
};
