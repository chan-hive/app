import React from "react";

import { AppBar, Toolbar } from "@mui/material";

import { Logo, Root } from "@components/Header.styles";

export interface HeaderProps {}
export interface HeaderStates {}

export default class Header extends React.Component<HeaderProps, HeaderStates> {
    public render() {
        return (
            <Root>
                <AppBar position="static" elevation={0} color="transparent" sx={{ boxShadow: "inset 0px -1px 1px #eaeef3" }}>
                    <Toolbar>
                        <Logo />
                    </Toolbar>
                </AppBar>
            </Root>
        );
    }
}
