import React from "react";
import Measure, { ContentRect, MeasuredComponentProps } from "react-measure";
import Head from "next/head";

import { AppBar, Toolbar, Typography } from "@mui/material";

import { HideOnScroll } from "@components/HideOnScroll";

import { Logo } from "@components/Header.styles";

export interface HeaderProps {
    title?: string | null;
    onAppBarHeightChange(height: number): void;
}
export interface HeaderStates {}

export default class Header extends React.Component<HeaderProps, HeaderStates> {
    private handleResize = ({ bounds }: ContentRect) => {
        if (!bounds) {
            return;
        }

        this.props.onAppBarHeightChange(Math.ceil(bounds.height));
    };

    private renderContent = ({ measureRef }: MeasuredComponentProps) => {
        const { title } = this.props;

        return (
            <HideOnScroll>
                <AppBar ref={measureRef} elevation={0} color="transparent" sx={{ background: "rgb(255, 255, 255)", boxShadow: "inset 0px -1px 1px #eaeef3" }}>
                    <Toolbar>
                        <Logo />
                        <Typography variant="h5" fontWeight="500">
                            {title || "Chanhive"}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        );
    };
    public render() {
        const { title } = this.props;

        return (
            <>
                <Head>
                    <title>{title ? `${title} :: Chanhive` : "Chanhive"}</title>
                </Head>
                <Measure bounds onResize={this.handleResize}>
                    {this.renderContent}
                </Measure>
            </>
        );
    }
}
