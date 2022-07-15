import _ from "lodash";

import { ThreadContextValue } from "@components/Thread/Context";

import { PostFile, ThreadWithPosts } from "@utils/types";
import { generatePostRepliesMap } from "@utils/generatePostRepliesMap";

export function generateThreadContextValue(
    thread: ThreadWithPosts,
    postRef: ThreadContextValue["postRef"],
    scrollToElement: ThreadContextValue["scrollToElement"],
    setHighlightedPost: ThreadContextValue["setHighlightedPost"],
): ThreadContextValue {
    return {
        thread,
        posts: thread.posts,
        files: thread.posts.map(p => p.file).filter((f): f is PostFile => Boolean(f)),
        postMap: _.chain(thread.posts)
            .keyBy(p => p.id)
            .mapValues(p => p)
            .value(),
        postRef,
        scrollToElement,
        repliesMap: generatePostRepliesMap(thread.posts),
        setHighlightedPost,
    };
}
