import React from "react";

import { AppBar, Toolbar } from "@mui/material";

import { Logo } from "@components/Header.styles";
import { HideOnScroll } from "@components/HideOnScroll";

export interface HeaderProps {}
export interface HeaderStates {}

export default class Header extends React.Component<HeaderProps, HeaderStates> {
    public render() {
        return (
            <HideOnScroll>
                <AppBar elevation={0} color="transparent" sx={{ background: "rgb(255, 255, 255)", boxShadow: "inset 0px -1px 1px #eaeef3" }}>
                    <Toolbar>
                        <Logo />
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        );
    }
}
