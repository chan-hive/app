import React from "react";

import { Skeleton } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PermMediaIcon from "@mui/icons-material/PermMedia";

import Card from "@components/UI/Card";
import CardFooterItem from "@components/UI/CardFooterItem";

import { BoardCardContent } from "@components/Board/Card.styles";
import { Placeholder } from "@styles/placeholder";

import { BoardListItem } from "@utils/types";

export interface BoardCardProps {
    board: BoardListItem;
    skeleton?: false;
}
export interface SkeletonBoardCardProps {
    skeleton: true;
}
export interface BoardCardStates {}

export default class BoardCard extends React.Component<BoardCardProps | SkeletonBoardCardProps, BoardCardStates> {
    private renderFooter = () => {
        if (this.props.skeleton) {
            return null;
        }

        const { board } = this.props;

        return (
            <>
                <Placeholder />
                <CardFooterItem icon={QuestionAnswerIcon}>{board.threadCount}</CardFooterItem>
                <CardFooterItem icon={PermMediaIcon}>{board.fileCount}</CardFooterItem>
            </>
        );
    };
    private renderFooterSkeleton = () => {
        return (
            <>
                <Placeholder />
                <Skeleton animation="wave" width="25%" />
            </>
        );
    };
    private renderSkeleton = () => {
        return <Card skeleton renderFooter={this.renderFooterSkeleton} />;
    };
    public render() {
        if (this.props.skeleton === true) {
            return this.renderSkeleton();
        }

        const { board } = this.props;

        return (
            <Card
                contentComponent={BoardCardContent}
                title={`/${board.id}/ - ${board.title}`}
                content={board.description}
                href="/boards/[boardId]"
                thumbnail={
                    board.latestThread
                        ? {
                              file: board.latestThread.opPost.file,
                              mosaic: true,
                          }
                        : undefined
                }
                as={`/boards/${board.id}`}
                renderFooter={this.renderFooter}
            />
        );
    }
}
