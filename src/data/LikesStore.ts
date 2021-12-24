import { Store } from "pullstate";


interface LikesStore {
    total: number;
    post_ids: any;

  }

  export const LikesStore = new Store<LikesStore>({
    total: 0,
    post_ids: []
});
  
export const addToLikes = (feed: string, postID: string) => {
    LikesStore.update(s => {
      if (s.post_ids.find((id: string) => id === `${ feed }/${ parseInt(postID) }`)) {
        s.post_ids = s.post_ids.filter((id: string) => id !== `${ feed }/${ parseInt(postID) }`);
    } else {
        s.post_ids = [ ...s.post_ids, `${ feed }/${ parseInt(postID) }` ];
    }
    });
}
