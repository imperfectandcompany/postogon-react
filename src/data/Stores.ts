import { LikesStore } from "./LikesStore";
import { createPullstateCore } from "pullstate";

export const PullstateCore = createPullstateCore({
  LikesStore
});