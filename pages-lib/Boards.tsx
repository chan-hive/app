import React from "react";

import { Container, Grid } from "@mui/material";

import { Root } from "@routes/Boards.styles";

import { BoardListComponent, BoardListQuery } from "@query";

import { DesktopOnly, MobileOnly } from "@styles/utils";
import { reactNoop } from "@utils/noop";
import { BoardListItem } from "@utils/types";
import BoardCard from "@components/Board/Card";

export interface BoardsRouteProps {}
export interface BoardsRouteStates {
    boards: BoardListItem[] | null;
}

export default class BoardsRoute extends React.Component<BoardsRouteProps, BoardsRouteStates> {
    public state: BoardsRouteStates = {
        boards: null,
    };

    private handleCompleted = ({ boards }: BoardListQuery) => {
        this.setState({
            boards,
        });
    };

    private renderBoard = (board: BoardListItem) => {
        return (
            <Grid item xs={12} sm={6} md={6} lg={3} key={board.id}>
                <BoardCard board={board} />
            </Grid>
        );
    };
    private renderContent = () => {
        const { boards } = this.state;
        if (!boards) {
            return null;
        }

        return (
            <Grid container spacing={2}>
                {boards.map(this.renderBoard)}
            </Grid>
        );
    };
    public render() {
        const content = this.renderContent();

        return (
            <>
                <BoardListComponent onCompleted={this.handleCompleted}>{reactNoop}</BoardListComponent>
                <Root>
                    <DesktopOnly>
                        <Container>{content}</Container>
                    </DesktopOnly>
                    <MobileOnly>{content}</MobileOnly>
                </Root>
            </>
        );
    }
}
