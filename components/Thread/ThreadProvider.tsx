import React from "react";

import Post from "@components/Post";

import { ThreadPost, ThreadWithPosts } from "@utils/types";
import { isTouchDevice } from "@utils/isTouchDevice";

export interface ThreadContextValues {
    thread: ThreadWithPosts;
    posts: ThreadPost[];
    setFocusedThreadId(id: ThreadPost["id"] | null): void;
}

export interface ThreadProviderProps {
    thread: ThreadWithPosts;
    posts: ThreadPost[];
    children: React.ReactNode;
}
export interface ThreadProviderStates {
    focusedPost: ThreadPost | null;
}

const ThreadContext = React.createContext<ThreadContextValues>({
    thread: null as any,
    posts: null as any,
    setFocusedThreadId: () => {},
});

export default class ThreadProvider extends React.Component<ThreadProviderProps, ThreadProviderStates> {
    public state: ThreadProviderStates = {
        focusedPost: null,
    };

    private setFocusedThreadId = (id: ThreadPost["id"] | null) => {
        if (id === null) {
            this.setState({
                focusedPost: null,
            });

            return;
        }

        const { posts } = this.props;
        const targetPost = posts.find(p => p.id === id);

        this.setState({
            focusedPost: targetPost || null,
        });
    };

    public render() {
        const { thread, posts, children } = this.props;
        const { focusedPost } = this.state;

        return (
            <ThreadContext.Provider
                value={{
                    thread,
                    posts,
                    setFocusedThreadId: this.setFocusedThreadId,
                }}
            >
                {children}
                {focusedPost && !isTouchDevice() && <Post modal post={focusedPost} />}
            </ThreadContext.Provider>
        );
    }
}

export function useThread() {
    return React.useContext(ThreadContext);
}
