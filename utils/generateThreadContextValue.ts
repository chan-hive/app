import { ThreadContextValue } from "@components/Thread/Context";

import { PostFile, ThreadWithPosts } from "@utils/types";

export function generateThreadContextValue(
    thread: ThreadWithPosts,
    postRef: ThreadContextValue["postRef"],
    scrollToElement: ThreadContextValue["scrollToElement"],
): ThreadContextValue {
    return {
        thread,
        posts: thread.posts,
        files: thread.posts.map(p => p.file).filter((f): f is PostFile => Boolean(f)),
        postRef,
        scrollToElement,
    };
}
