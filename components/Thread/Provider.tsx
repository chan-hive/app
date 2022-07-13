import React from "react";
import memoizeOne from "memoize-one";

import { ThreadContextProvider, ThreadContextValue } from "@components/Thread/Context";

import { generateThreadContextValue } from "@utils/generateThreadContextValue";

import { ThreadPost, ThreadWithPosts } from "@utils/types";

export interface ThreadProviderProps {
    thread: ThreadWithPosts;
    children: React.ReactNode;
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
            value: generateThreadContextValue(this.props.thread, this.handlePostCardElement),
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

    public render() {
        const { children, scrollToElement } = this.props;
        const { value } = this.state;

        return <ThreadContextProvider value={{ ...value, scrollToElement }}>{children}</ThreadContextProvider>;
    }
}
