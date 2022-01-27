import React from "react";
import Head from "next/head";

import { AppBar, Toolbar, Typography } from "@mui/material";

import { Logo } from "@components/Header.styles";
import { HideOnScroll } from "@components/HideOnScroll";

export interface HeaderProps {
    title?: string | null;
}
export interface HeaderStates {}

export default class Header extends React.Component<HeaderProps, HeaderStates> {
    public render() {
        const { title } = this.props;

        return (
            <>
                <Head>
                    <title>{title ? `${title} :: Chanhive` : "Chanhive"}</title>
                </Head>
                <HideOnScroll>
                    <AppBar elevation={0} color="transparent" sx={{ background: "rgb(255, 255, 255)", boxShadow: "inset 0px -1px 1px #eaeef3" }}>
                        <Toolbar>
                            <Logo />
                            <Typography variant="h5" fontWeight="500">
                                {title || "Chanhive"}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
            </>
        );
    }
}
