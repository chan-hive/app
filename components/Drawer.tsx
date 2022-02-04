import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import { SxProps } from "@mui/system";

import { Divider, Drawer as MuiDrawer, Hidden, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Theme, Toolbar, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import { DRAWER_WIDTH } from "@constants/layout";

import { Root } from "@components/Drawer.styles";

import { BoardsProps, withBoards } from "@query";
import { Board } from "@utils/types";

export interface DrawerProps {}
export interface DrawerStates {}

class Drawer extends React.PureComponent<DrawerProps & BoardsProps & WithRouterProps, DrawerStates> {
    private renderBoard = (board: Board) => {
        const { router } = this.props;

        return (
            <Link href="/boards/[boardId]" as={`/boards/${board.id}`} passHref>
                <ListItem button component="a" key={board.id} selected={router.asPath === `/boards/${board.id}`}>
                    <ListItemText primary={`/${board.id}/ - ${board.title}`} />
                    <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                        {board.threadCount}
                    </Typography>
                </ListItem>
            </Link>
        );
    };
    private renderContent = () => {
        const { data, router } = this.props;
        if (!data.boards || data.loading) {
            return null;
        }

        const allThreadCount = data.boards.reduce((a, b) => a + b.threadCount, 0);

        return (
            <Root>
                <Toolbar />
                <List sx={{ flex: "1 1", width: "100%", bgcolor: "background.paper" }} component="nav">
                    <Link href="/boards" passHref>
                        <ListItem button component="a" selected={router.asPath === "/boards" || router.asPath === "/"}>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Boards" />
                            <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                                {data.boards.length}
                            </Typography>
                        </ListItem>
                    </Link>
                    <Link href="/threads" passHref>
                        <ListItem button component="a" selected={router.asPath === "/threads"}>
                            <ListItemIcon>
                                <QuestionAnswerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Threads" />
                            <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                                {allThreadCount}
                            </Typography>
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List
                    subheader={
                        <ListSubheader component="div" id="board-list-subheader">
                            Boards
                        </ListSubheader>
                    }
                    sx={{ flex: "1 1", width: "100%", bgcolor: "background.paper" }}
                    component="nav"
                    aria-labelledby="board-list-subheader"
                >
                    {data.boards.map(this.renderBoard)}
                </List>
            </Root>
        );
    };
    public render() {
        const content = this.renderContent();
        const sxProps: SxProps<Theme> = {
            width: DRAWER_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: "border-box", borderRightColor: "#edf0f4", flex: "1 1 auto" },
        };

        return (
            <>
                <Hidden xlDown>
                    <MuiDrawer variant="permanent" sx={sxProps}>
                        {content}
                    </MuiDrawer>
                </Hidden>
                <Hidden xlUp>
                    <MuiDrawer sx={sxProps}>{content}</MuiDrawer>
                </Hidden>
            </>
        );
    }
}

export default withBoards({})(withRouter(Drawer));
