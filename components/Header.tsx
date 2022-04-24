import React from "react";
import Measure, { ContentRect, MeasuredComponentProps } from "react-measure";
import Head from "next/head";

import { AppBar, Box, Hidden, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { NavigationButtonItem } from "@components/Layout";
import { HideOnScroll } from "@components/HideOnScroll";

import { Logo } from "@components/Header.styles";

export interface HeaderProps {
    title?: string | null;
    onAppBarHeightChange(height: number): void;
    buttons: NavigationButtonItem[];
}
export interface HeaderStates {}

export default class Header extends React.Component<HeaderProps, HeaderStates> {
    private handleResize = ({ bounds }: ContentRect) => {
        if (!bounds) {
            return;
        }

        this.props.onAppBarHeightChange(Math.ceil(bounds.height));
    };

    private renderButton = ({ name, onClick, label, icon: Icon }: NavigationButtonItem, index: number, array: NavigationButtonItem[]) => {
        return (
            <Tooltip key={name} title={label}>
                <IconButton
                    edge={index + 1 === array.length ? "end" : undefined}
                    sx={{ color: "rgba(0, 0, 0, 0.5)" }}
                    size="large"
                    aria-label={label}
                    color="inherit"
                    onClick={onClick}
                >
                    <Icon />
                </IconButton>
            </Tooltip>
        );
    };
    private renderContent = ({ measureRef }: MeasuredComponentProps) => {
        const { title, buttons } = this.props;
        const content = (
            <Toolbar>
                <Hidden mdDown>
                    <Logo />
                </Hidden>
                <Hidden mdUp>
                    <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                </Hidden>
                <Typography variant="h6" fontWeight="500" noWrap>
                    {title ? `${title}` : "Chanhive"}
                </Typography>
                <Hidden mdDown>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: "flex" }}>{buttons.map(this.renderButton)}</Box>
                </Hidden>
            </Toolbar>
        );

        return (
            <>
                <Hidden mdDown>
                    <AppBar
                        ref={measureRef}
                        elevation={0}
                        color="transparent"
                        sx={{ background: "rgb(255, 255, 255)", boxShadow: "inset 0px -1px 1px #eaeef3", zIndex: theme => theme.zIndex.drawer + 1 }}
                    >
                        {content}
                    </AppBar>
                </Hidden>
                <Hidden mdUp>
                    <HideOnScroll>
                        <AppBar ref={measureRef} sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
                            {content}
                        </AppBar>
                    </HideOnScroll>
                </Hidden>
            </>
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
