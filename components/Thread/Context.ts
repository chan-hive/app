import React from "react";

import { PostFile, ThreadPost, ThreadWithPosts } from "@utils/types";

export interface ThreadContextValue {
    thread: ThreadWithPosts;
    posts: ThreadPost[];
    postMap: Record<ThreadPost["id"], ThreadPost>;
    files: PostFile[];
    postRef(id: ThreadPost["id"]): (dom?: HTMLDivElement | null) => void;
    scrollToElement(id: ThreadPost["id"]): void;
    repliesMap: Record<ThreadPost["id"], ThreadPost["id"][] | undefined>;
    setHighlightedPost(id: ThreadPost["id"] | null): void;
}

const ThreadContext = React.createContext<ThreadContextValue>(null as any);
export const ThreadContextProvider = ThreadContext.Provider;

export function useThread() {
    return React.useContext(ThreadContext);
}
