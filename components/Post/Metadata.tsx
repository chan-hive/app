import React from "react";
import moment from "moment";
import fileSize from "filesize";

import { Author, Date, FileName, Root, Row, Span, Title } from "@components/Post/Metadata.styles";

import { ThreadPost } from "@utils/types";
import { DesktopOnly, MobileOnly } from "@styles/utils";

export interface PostMetadataProps {
    post: ThreadPost;
}
export interface PostMetadataStates {}

export default class PostMetadata extends React.PureComponent<PostMetadataProps, PostMetadataStates> {
    public render() {
        const { post } = this.props;

        return (
            <Root>
                <MobileOnly>
                    <Row>
                        <Span>No. {post.id}</Span>
                        <Date component="time">{moment(post.createdAt).fromNow()}</Date>
                    </Row>
                    <Row>
                        {post.file && (
                            <>
                                <FileName>
                                    {post.file.name}
                                    {post.file.extension}
                                </FileName>
                                <Span>{post.file.extension.slice(1).toUpperCase()}</Span>
                                <Span>{fileSize(post.file.size)}</Span>
                                <Span>
                                    {post.file.width}x{post.file.height}
                                </Span>
                            </>
                        )}
                    </Row>
                </MobileOnly>
                <DesktopOnly>
                    {post.title && <Title>{post.title}</Title>}
                    <Author>{post.name}</Author>
                    <Date component="time">{moment(post.createdAt).fromNow()}</Date>
                    {post.file && (
                        <FileName component="a" href={post.file.url} target="_blank">
                            {post.file.name}
                            {post.file.extension}
                        </FileName>
                    )}
                </DesktopOnly>
            </Root>
        );
    }
}
