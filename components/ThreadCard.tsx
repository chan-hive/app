/* eslint-disable react/no-danger */
import React from "react";

import { Paper } from "@mui/material";

import { Content, Root, Thumbnail, ThumbnailWrapper, Title } from "@components/ThreadCard.styles";
import { ThreadListItem } from "@utils/types";

export interface ThreadCardProps {
    thread: ThreadListItem;
}
export interface ThreadCardStates {}

export default class ThreadCard extends React.Component<ThreadCardProps, ThreadCardStates> {
    public render() {
        const { thread } = this.props;
        const { file, content, title } = thread.opPost;

        return (
            <Paper elevation={0} sx={{ border: "1px solid #eaedf2", boxSizing: "border-box" }}>
                <Root>
                    <ThumbnailWrapper>
                        {file && (
                            <Thumbnail
                                style={{
                                    width: file.thumbnailWidth,
                                    height: file.thumbnailHeight,
                                    backgroundImage: `url(http://localhost:9000/static/${file.uploadedTimestamp}s.jpg)`,
                                }}
                            />
                        )}
                    </ThumbnailWrapper>
                    <Title>{title}</Title>
                    {content && (
                        <Content>
                            <span dangerouslySetInnerHTML={{ __html: content }} />
                        </Content>
                    )}
                </Root>
            </Paper>
        );
    }
}
