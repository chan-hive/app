import React from "react";

import { Container } from "@mui/material";

import Post from "@components/Post";

import { Root } from "@routes/Thread.styles";

import { ThreadWithPostsComponent, ThreadWithPostsQuery } from "@query";

import { reactNoop } from "@utils/noop";
import { ThreadPost } from "@utils/types";
import { parsePostContent } from "@utils/parsePostContent";

export interface ThreadRouteProps {
    threadId: number;
    boardId: string;
}
export interface ThreadRouteStates {
    posts: ThreadPost[] | null;
}

export default class ThreadRoute extends React.Component<ThreadRouteProps, ThreadRouteStates> {
    public state: ThreadRouteStates = {
        posts: null,
    };

    private handleComplete = ({ thread }: ThreadWithPostsQuery) => {
        this.setState({
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
        const { posts } = this.state;

        return (
            <Root>
                <ThreadWithPostsComponent variables={{ threadId, boardId }} onCompleted={this.handleComplete}>
                    {reactNoop}
                </ThreadWithPostsComponent>
                <Container>{posts && posts.map(this.renderPost)}</Container>
            </Root>
        );
    }
}
