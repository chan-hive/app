import React from "react";

import Thumbnail from "@components/Thumbnail";
import PostContent from "@components/Post/Content";
import PostMetadata from "@components/Post/Metadata";

import { Body, Card, Root, ThumbnailWrapper } from "@components/Post/index.styles";

import { ThreadPost } from "@utils/types";

export interface PostProps {
    post: ThreadPost;
}
export interface PostStates {}

export default class Post extends React.Component<PostProps, PostStates> {
    public render() {
        const { post } = this.props;

        return (
            <Card variant="outlined">
                <Root>
                    <PostMetadata post={post} />
                    <Body>
                        {post.file && (
                            <ThumbnailWrapper>
                                <Thumbnail file={post.file} />
                            </ThumbnailWrapper>
                        )}
                        <PostContent content={post.content} postId={post.id} />
                    </Body>
                </Root>
            </Card>
        );
    }
}
