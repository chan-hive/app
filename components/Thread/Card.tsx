/* eslint-disable react/no-danger */
import React from "react";
import Link from "next/link";

import { Skeleton } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import PermMediaIcon from "@mui/icons-material/PermMedia";

import Thumbnail from "@components/Thumbnail";

import { BoardName, Body, Content, Footer, FooterItemValue, Item, Metadata, Root, ThumbnailWrapper, Title } from "@components/Thread/Card.styles";

import { ThreadListItem } from "@utils/types";
import { Placeholder } from "@styles/placeholder";

export interface ThreadCardProps {
    thread?: ThreadListItem;
}
export interface ThreadCardStates {}

const THUMBNAIL_SIZE = { width: "100%", height: 145 };

export default class ThreadCard extends React.Component<ThreadCardProps, ThreadCardStates> {
    private renderSkeleton = () => {
        return (
            <Root skeleton>
                <ThumbnailWrapper>
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={145} />
                </ThumbnailWrapper>
                <Body>
                    <Title variant="h6">
                        <Skeleton animation="wave" />
                    </Title>
                    <Content variant="body1">
                        <Skeleton animation="wave" />
                        <Skeleton width="65%" animation="wave" />
                    </Content>
                </Body>
                <Metadata>
                    <BoardName variant="body1">
                        <Skeleton animation="wave" width="25%" />
                    </BoardName>
                </Metadata>
                <Footer>
                    <Placeholder />
                    <Skeleton animation="wave" width="50%" />
                </Footer>
            </Root>
        );
    };
    private renderContent = (thread: ThreadListItem) => {
        const { file } = thread.opPost;

        return (
            <Root>
                <ThumbnailWrapper>
                    {file && (
                        <Thumbnail
                            mosaic={thread.board.id !== "wsg"}
                            file={file}
                            size={THUMBNAIL_SIZE}
                            href="/[boardId]/thread/[threadId]"
                            as={`/${thread.board.id}/thread/${thread.id}`}
                        />
                    )}
                </ThumbnailWrapper>
                <Link href="/[boardId]/thread/[threadId]" as={`/${thread.board.id}/thread/${thread.id}`} passHref>
                    <Body>
                        <Title variant="h6">{thread.opPost.title || `Thread #${thread.id}`}</Title>
                        <Content variant="body1">
                            <span dangerouslySetInnerHTML={{ __html: thread.opPost.content || "" }} />
                        </Content>
                    </Body>
                </Link>
                <Metadata>
                    <BoardName variant="body1">{thread.board.title}</BoardName>
                </Metadata>
                <Footer>
                    <Placeholder />
                    <Item>
                        <ForumIcon />
                        <FooterItemValue variant="body1">{thread.postCount}</FooterItemValue>
                    </Item>
                    <Item>
                        <PermMediaIcon />
                        <FooterItemValue variant="body1">{thread.fileCount}</FooterItemValue>
                    </Item>
                </Footer>
            </Root>
        );
    };

    public render() {
        const { thread } = this.props;
        if (!thread) {
            return this.renderSkeleton();
        }

        return this.renderContent(thread);
    }
}
