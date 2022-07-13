/* eslint-disable no-restricted-syntax */
import _ from "lodash";
import { QuoteLinkContentItem, ThreadPost } from "@utils/types";

type Full<T> = {
    [P in keyof T]-?: T[P];
};

export function generatePostRepliesMap(posts: ThreadPost[]) {
    const postContents = _.chain(posts)
        .map<[ThreadPost["id"], QuoteLinkContentItem[]]>(p => [
            p.id,
            p.content
                .map(i => i.contents)
                .flat()
                .filter((i): i is Full<QuoteLinkContentItem> => i.__typename === "QuoteLinkContent"),
        ])
        .filter(([, d]) => d.length > 0)
        .value();

    const repliesMap: Record<ThreadPost["id"], ThreadPost["id"][]> = {};
    for (const post of posts) {
        repliesMap[post.id] = postContents.filter(([, pcs]) => pcs.some(pc => pc.postId === post.id)).map(([id]) => id);
    }

    return repliesMap;
}
