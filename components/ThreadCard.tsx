/* eslint-disable react/no-danger */
import React from "react";

import ForumIcon from "@mui/icons-material/Forum";
import PermMediaIcon from "@mui/icons-material/PermMedia";

import { BoardName, Body, Content, Footer, FooterItemValue, Item, Metadata, Root, Thumbnail, ThumbnailWrapper, Title } from "@components/ThreadCard.styles";

import { ThreadListItem } from "@utils/types";
import { Placeholder } from "@styles/placeholder";

export interface ThreadCardProps {
    thread: ThreadListItem;
}
export interface ThreadCardStates {}

export default class ThreadCard extends React.Component<ThreadCardProps, ThreadCardStates> {
    public render() {
        const { thread } = this.props;
        const { file } = thread.opPost;

        return (
            <Root>
                <ThumbnailWrapper>
                    {file && (
                        <Thumbnail
                            style={{
                                width: "100%",
                                height: 145,
                                backgroundImage: thread.opPost.file ? `url(${thread.opPost.file.thumbnailUrl})` : "none",
                            }}
                        />
                    )}
                </ThumbnailWrapper>
                <Body>
                    <Title variant="h6">{thread.opPost.title || `Thread #${thread.id}`}</Title>
                    <Content variant="body1">
                        <span dangerouslySetInnerHTML={{ __html: thread.opPost.content || "" }} />
                    </Content>
                </Body>
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
    }
}
