import React from "react";

import { withTheme } from "@emotion/react";
import { Theme } from "@mui/material";

import Post from "@components/Post";

import { ThreadPost, ThreadWithPosts } from "@utils/types";
import { isTouchDevice } from "@utils/isTouchDevice";
import { withLayout, WithLayoutProps } from "@components/Layout.hoc";

export interface ThreadContextValues {
    thread: ThreadWithPosts;
    posts: ThreadPost[];
    setFocusedThreadId(id: ThreadPost["id"] | null): void;
    scrollTo(id: ThreadPost["id"]): void;
    registerDOMObject(id: ThreadPost["id"], dom: HTMLDivElement): void;
    unregisterDOMObject(id: ThreadPost["id"]): void;
}

export interface ThreadProviderProps {
    thread: ThreadWithPosts;
    posts: ThreadPost[];
    children: React.ReactNode;
    theme: Theme;
}
export interface ThreadProviderStates {
    focusedPost: ThreadPost | null;
}

const ThreadContext = React.createContext<ThreadContextValues>({
    thread: null as any,
    posts: null as any,
    setFocusedThreadId() {},
    scrollTo() {},
    registerDOMObject() {},
    unregisterDOMObject() {},
});

class ThreadProvider extends React.Component<ThreadProviderProps & WithLayoutProps, ThreadProviderStates> {
    public state: ThreadProviderStates = {
        focusedPost: null,
    };

    private readonly domObjectMap = new Map<ThreadPost["id"], HTMLDivElement>();

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
    private scrollTo = (id: ThreadPost["id"]) => {
        const dom = this.domObjectMap.get(id);
        if (!dom) {
            throw new Error(`There's no registered post with id: ${id}`);
        }

        const { appBarHeight, theme } = this.props;
        const { top } = dom.getBoundingClientRect();
        window.scrollTo({
            top: Math.max(window.scrollY + top - appBarHeight - parseInt(theme.spacing(2), 10), 0),
        });
    };
    private registerDOMObject = (id: ThreadPost["id"], dom: HTMLDivElement) => {
        this.domObjectMap.set(id, dom);
    };
    private unregisterDOMObject = (id: ThreadPost["id"]) => {
        this.domObjectMap.delete(id);
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
                    scrollTo: this.scrollTo,
                    registerDOMObject: this.registerDOMObject,
                    unregisterDOMObject: this.unregisterDOMObject,
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

export default withTheme(withLayout(ThreadProvider));
