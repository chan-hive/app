import React from "react";

import Post from "@components/Post";
import ThreadProvider from "@components/Thread/ThreadProvider";

import { Root, WidthWrapper } from "@routes/Thread.styles";

import { ThreadInformationQuery, ThreadWithPostsComponent, ThreadWithPostsQuery } from "@query";

import { reactNoop } from "@utils/noop";

export interface ThreadRouteProps {
    threadId: number;
    boardId: string;
    thread: ThreadInformationQuery["thread"];
}
export interface ThreadRouteStates {
    thread: ThreadWithPostsQuery["thread"] | null;
}

export default class ThreadRoute extends React.Component<ThreadRouteProps, ThreadRouteStates> {
    public state: ThreadRouteStates = {
        thread: null,
    };

    private handleComplete = ({ thread }: ThreadWithPostsQuery) => {
        this.setState({
            thread,
        });
    };

    private renderPost = (post: ThreadWithPostsQuery["thread"]["posts"][0]) => {
        return <Post key={post.id} post={post} />;
    };
    public render() {
        const { threadId, boardId } = this.props;
        const { thread } = this.state;
        const content = thread && thread.posts.slice(0, 1).map(this.renderPost);

        return (
            <Root>
                <ThreadWithPostsComponent variables={{ threadId, boardId }} onCompleted={this.handleComplete}>
                    {reactNoop}
                </ThreadWithPostsComponent>
                {thread && (
                    <ThreadProvider posts={thread.posts} thread={thread}>
                        <WidthWrapper>{content}</WidthWrapper>
                    </ThreadProvider>
                )}
            </Root>
        );
    }
}
