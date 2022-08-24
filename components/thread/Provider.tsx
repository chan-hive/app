import React from "react";
import memoizeOne from "memoize-one";

import { ThreadContextProvider, ThreadContextValue } from "@components/thread/Context";

import { generateThreadContextValue } from "@utils/generateThreadContextValue";

import { ThreadPost, ThreadWithPosts } from "@utils/types";

export interface ThreadProviderProps {
    thread: ThreadWithPosts;
    children: React.ReactNode;
    onHighlightedPostChange(id: ThreadPost["id"] | null): void;
    onPostElement(id: ThreadPost["id"], dom: HTMLDivElement): void;
    scrollToElement(id: ThreadPost["id"]): void;
}
export interface ThreadProviderStates {
    value: ThreadContextValue;
}

export default class ThreadProvider extends React.Component<ThreadProviderProps, ThreadProviderStates> {
    public constructor(props: Readonly<ThreadProviderProps> | ThreadProviderProps) {
        super(props);

        this.state = {
            value: generateThreadContextValue(this.props.thread, this.handlePostCardElement, this.props.scrollToElement, this.setHighlightedPost),
        };
    }

    private handlePostCardElement = memoizeOne((id: ThreadPost["id"]) => {
        return (dom?: HTMLDivElement | null) => {
            if (!dom) {
                return;
            }

            this.props.onPostElement(id, dom);
        };
    });

    private setHighlightedPost = (id: ThreadPost["id"] | null) => {
        this.props.onHighlightedPostChange(id);
    };

    public render() {
        const { children } = this.props;
        const { value } = this.state;

        return <ThreadContextProvider value={{ ...value }}>{children}</ThreadContextProvider>;
    }
}
