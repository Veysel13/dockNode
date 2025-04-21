import { userEvents } from "./userEvents";
import { postEvents } from "./postEvents";

export function loadAllEvents() {
  userEvents();
  postEvents();
}

loadAllEvents();
