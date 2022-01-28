import React from "react";

import { SxProps } from "@mui/system";

import { Drawer as MuiDrawer, Hidden, Theme, Toolbar } from "@mui/material";

import { DRAWER_WIDTH } from "@constants/layout";

import { Root } from "@components/Drawer.styles";

export interface DrawerProps {}
export interface DrawerStates {}

export default class Drawer extends React.Component<DrawerProps, DrawerStates> {
    private renderContent = () => {
        return (
            <Root>
                <Toolbar />
            </Root>
        );
    };
    public render() {
        const content = this.renderContent();
        const sxProps: SxProps<Theme> = {
            width: DRAWER_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: "border-box", borderRightColor: "#edf0f4" },
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
