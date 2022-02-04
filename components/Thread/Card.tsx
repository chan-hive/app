/* eslint-disable react/no-danger */
import React from "react";

import { Skeleton } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import PermMediaIcon from "@mui/icons-material/PermMedia";

import Card from "@components/UI/Card";
import CardFooterItem from "@components/UI/CardFooterItem";

import { BoardName } from "@components/Thread/Card.styles";

import { Placeholder } from "@styles/placeholder";
import { ThreadListItem } from "@utils/types";

export interface ThreadCardProps {
    thread?: ThreadListItem;
}
export interface ThreadCardStates {}

export default class ThreadCard extends React.Component<ThreadCardProps, ThreadCardStates> {
    private renderMetadata = () => {
        const { thread } = this.props;

        return <BoardName variant="body1">{thread!.board.title}</BoardName>;
    };
    private renderFooter = () => {
        const { thread } = this.props;

        return (
            <>
                <Placeholder />
                <CardFooterItem icon={ForumIcon}>{thread!.postCount}</CardFooterItem>
                <CardFooterItem icon={PermMediaIcon}>{thread!.fileCount}</CardFooterItem>
            </>
        );
    };

    private renderFooterSkeleton = () => {
        return (
            <>
                <Placeholder />
                <Skeleton animation="wave" width="50%" />
            </>
        );
    };
    private renderMetadataSkeleton = () => {
        return (
            <>
                <Skeleton animation="wave" width="25%" />
            </>
        );
    };

    public render() {
        const { thread } = this.props;
        if (!thread) {
            return <Card skeleton renderFooter={this.renderFooterSkeleton} renderMetadata={this.renderMetadataSkeleton} />;
        }

        return (
            <Card
                title={thread.opPost.title}
                content={thread.opPost.content}
                href="/[boardId]/thread/[threadId]"
                thumbnail={{
                    file: thread.opPost.file,
                    mosaic: !thread.board.isWorkSafe,
                }}
                as={`/${thread.board.id}/thread/${thread.id}`}
                renderFooter={this.renderFooter}
                renderMetadata={this.renderMetadata}
            />
        );
    }
}
