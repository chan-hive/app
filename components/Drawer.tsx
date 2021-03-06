import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import { SxProps } from "@mui/system";

import {
    Divider,
    Drawer as MuiDrawer,
    Hidden,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Theme,
    Toolbar,
    Typography,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SettingsIcon from "@mui/icons-material/Settings";

import { DRAWER_WIDTH } from "@constants/layout";

import { Placeholder } from "@styles/placeholder";
import { Root } from "@components/Drawer.styles";

import { BoardsProps, withBoards } from "@query";
import { Board } from "@utils/types";

export interface DrawerProps {}
export interface DrawerStates {}

class Drawer extends React.PureComponent<DrawerProps & BoardsProps & WithRouterProps, DrawerStates> {
    private renderBoard = (board: Board) => {
        const { router } = this.props;

        return (
            <Link key={board.id} href="/boards/[boardId]" as={`/boards/${board.id}`} passHref>
                <ListItemButton component="a" key={board.id} selected={router.asPath === `/boards/${board.id}`}>
                    <ListItemText primary={`/${board.id}/ - ${board.title}`} />
                    <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                        {board.threadCount}
                    </Typography>
                </ListItemButton>
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
                <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav">
                    <Link href="/boards" passHref>
                        <ListItemButton component="a" selected={router.asPath === "/boards" || router.asPath === "/"}>
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Boards" />
                            <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                                {data.boards.length}
                            </Typography>
                        </ListItemButton>
                    </Link>
                    <Link href="/threads" passHref>
                        <ListItemButton component="a" selected={router.asPath === "/threads"}>
                            <ListItemIcon>
                                <QuestionAnswerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Threads" />
                            <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                                {allThreadCount}
                            </Typography>
                        </ListItemButton>
                    </Link>
                </List>
                <Divider />
                <List
                    subheader={
                        <ListSubheader component="div" id="board-list-subheader">
                            Boards
                        </ListSubheader>
                    }
                    sx={{ width: "100%", bgcolor: "background.paper" }}
                    component="nav"
                    aria-labelledby="board-list-subheader"
                >
                    {data.boards.map(this.renderBoard)}
                </List>
                <Placeholder />
                <Divider />
                <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav">
                    <Link href="/settings" passHref>
                        <ListItemButton component="a" selected={router.asPath === "/index.tsx"}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </Link>
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
