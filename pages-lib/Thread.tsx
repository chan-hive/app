import React from "react";

import { Theme, useTheme } from "@mui/material";

import PostCard from "@components/Post/Card";
import ThreadProvider from "@components/Thread/Provider";

import { Root, WidthWrapper } from "@routes/Thread.styles";

import useAppBarHeight from "@utils/getAppBarHeight";
import { ThreadPost, ThreadWithPosts } from "@utils/types";

export interface ThreadRouteProps {
    thread: ThreadWithPosts;
    theme: Theme;
}

export default function ThreadRoute(props: ThreadRouteProps) {
    const { thread } = props;
    const postElements = React.useRef<Record<ThreadPost["id"], HTMLDivElement>>({});
    const theme = useTheme();
    const appBarHeight = useAppBarHeight();

    const handlePostElement = React.useCallback((id: ThreadPost["id"], dom: HTMLDivElement) => {
        postElements.current[id] = dom;
    }, []);

    const scrollToElement = React.useCallback(
        (id: ThreadPost["id"]) => {
            const element = postElements.current[id];
            if (!element) {
                return;
            }

            window.scrollTo({
                top: element.offsetTop - appBarHeight - parseInt(theme.spacing(1), 10),
            });
        },
        [appBarHeight],
    );

    return (
        <ThreadProvider thread={thread} onPostElement={handlePostElement} scrollToElement={scrollToElement}>
            <Root>
                <WidthWrapper>
                    {thread.posts.map(p => (
                        <PostCard key={p.id} post={p} />
                    ))}
                </WidthWrapper>
            </Root>
        </ThreadProvider>
    );
}
