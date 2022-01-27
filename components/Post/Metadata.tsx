import React from "react";
import moment from "moment";

import { Author, Date, FileName, Root, Title } from "@components/Post/Metadata.styles";

import { ThreadPost } from "@utils/types";

export interface PostMetadataProps {
    post: ThreadPost;
}
export interface PostMetadataStates {}

export default class PostMetadata extends React.Component<PostMetadataProps, PostMetadataStates> {
    public render() {
        const { post } = this.props;

        return (
            <Root>
                {post.title && <Title>{post.title}</Title>}
                <Author>{post.name}</Author>
                <Date component="time">{moment(post.createdAt).fromNow()}</Date>
                {post.file && (
                    <FileName component="a" href={post.file.url} target="_blank">
                        {post.file.name}
                        {post.file.extension}
                    </FileName>
                )}
            </Root>
        );
    }
}
