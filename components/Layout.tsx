import React from "react";

import { Toolbar } from "@mui/material";
import { Global } from "@emotion/react";

import Header from "@components/Header";
import Preview from "@components/Preview";
import Drawer from "@components/Drawer";

import { GlobalStyle, Main, Root } from "@components/Layout.styles";

export interface LayoutProps {
    children: React.ReactNode;
    title?: string | null;
}
export interface LayoutStates {
    appBarHeight: number;
}

export interface LayoutContextValues {
    appBarHeight: number;
}

const LayoutContext = React.createContext<LayoutContextValues>({
    appBarHeight: 0,
});

export default class Layout extends React.Component<LayoutProps, LayoutStates> {
    public state: LayoutStates = {
        appBarHeight: 0,
    };

    private handleAppBarHeightChange = (height: number) => {
        this.setState({
            appBarHeight: height,
        });
    };

    public render() {
        const { children, title } = this.props;
        const { appBarHeight } = this.state;

        return (
            <LayoutContext.Provider value={{ appBarHeight }}>
                <Global styles={GlobalStyle} />
                <Header title={title} onAppBarHeightChange={this.handleAppBarHeightChange} />
                <Root>
                    <Drawer />
                    <Main>
                        <Toolbar />
                        {children}
                    </Main>
                </Root>
                <Preview />
            </LayoutContext.Provider>
        );
    }
}

export function useLayout() {
    return React.useContext(LayoutContext);
}
