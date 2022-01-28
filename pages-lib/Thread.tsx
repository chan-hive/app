import React from "react";

import { Container } from "@mui/material";

import Post from "@components/Post";

import { Root } from "@routes/Thread.styles";

import { ThreadInformationQuery, ThreadWithPostsComponent, ThreadWithPostsQuery } from "@query";

import { reactNoop } from "@utils/noop";
import { ThreadPost, ThreadWithPosts } from "@utils/types";
import { parsePostContent } from "@utils/parsePostContent";
import ThreadProvider from "@components/Thread/ThreadProvider";

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
                content: p.content ? parsePostContent(p.content, p.id) : [],
            })),
        });
    };

    private renderPost = (post: ThreadPost) => {
        return <Post key={post.id} post={post} />;
    };
    public render() {
        const { threadId, boardId } = this.props;
        const { posts, thread } = this.state;

        return (
            <Root>
                <ThreadWithPostsComponent variables={{ threadId, boardId }} onCompleted={this.handleComplete}>
                    {reactNoop}
                </ThreadWithPostsComponent>
                {posts && thread && (
                    <ThreadProvider posts={posts} thread={thread}>
                        <Container>{posts.map(this.renderPost)}</Container>
                    </ThreadProvider>
                )}
            </Root>
        );
    }
}
