import React from "react";

import { Toolbar } from "@mui/material";
import { Global } from "@emotion/react";

import Header from "@components/Header";
import Preview from "@components/Preview";

import { GlobalStyle, Root } from "@components/Layout.styles";

export interface LayoutProps {
    children: React.ReactNode;
    title?: string | null;
}
export interface LayoutStates {}

export default class Layout extends React.Component<LayoutProps, LayoutStates> {
    public render() {
        const { children, title } = this.props;

        return (
            <>
                <Global styles={GlobalStyle} />
                <Header title={title} />
                <Root>
                    <Toolbar />
                    {children}
                </Root>
                <Preview />
            </>
        );
    }
}
