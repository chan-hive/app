import React from "react";

import Post from "@components/Post";
import ThreadProvider from "@components/Thread/ThreadProvider";

import { Root, WidthWrapper } from "@routes/Thread.styles";

import { ThreadInformationQuery, ThreadWithPostsComponent, ThreadWithPostsQuery } from "@query";

import { reactNoop } from "@utils/noop";
import { ThreadPost, ThreadWithPosts } from "@utils/types";
import { parsePostContent } from "@utils/parsePostContent";

export interface ThreadRouteProps {
    threadId: number;
    boardId: string;
    thread: ThreadInformationQuery["thread"];
}
export interface ThreadRouteStates {
    posts: ThreadPost[] | null;
    thread: ThreadWithPosts | null;
}

export default class ThreadRoute extends React.Component<ThreadRouteProps, ThreadRouteStates> {
    public state: ThreadRouteStates = {
        posts: null,
        thread: null,
    };

    private handleComplete = ({ thread }: ThreadWithPostsQuery) => {
        this.setState({
            thread,
            posts: thread.posts.map<ThreadPost>(p => ({
                ...p,
                content: p.content ? parsePostContent(p.content, p.id, thread.id) : [],
            })),
        });
    };

    private renderPost = (post: ThreadPost) => {
        return <Post key={post.id} post={post} />;
    };
    public render() {
        const { threadId, boardId } = this.props;
        const { posts, thread } = this.state;
        const content = posts && thread && posts.map(this.renderPost);

        return (
            <Root>
                <ThreadWithPostsComponent variables={{ threadId, boardId }} onCompleted={this.handleComplete}>
                    {reactNoop}
                </ThreadWithPostsComponent>
                {posts && thread && (
                    <ThreadProvider posts={posts} thread={thread}>
                        <WidthWrapper>{content}</WidthWrapper>
                    </ThreadProvider>
                )}
            </Root>
        );
    }
}
