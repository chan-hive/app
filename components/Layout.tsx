import React from "react";
import { cloneDeep } from "lodash";

import { Toolbar } from "@mui/material";
import { Global } from "@emotion/react";

import Header from "@components/Header";
import Drawer from "@components/Drawer";

import { GlobalStyle, Main, Root } from "@components/Layout.styles";

export interface LayoutProps {
    children: React.ReactNode;
    title?: string | null;
    withoutPadding?: boolean;
}
export interface LayoutStates {
    appBarHeight: number;
    navigationButtonItems: NavigationButtonItem[];
}

export interface NavigationButtonItem {
    icon: React.ComponentType;
    onClick(e: React.MouseEvent): void;
    name: string;
    label: string;
}

export interface LayoutContextValues {
    appBarHeight: number;
    navigationButtonItems: NavigationButtonItem[];
    setNavigationButtonItems(items: NavigationButtonItem[]): void;
}

const LayoutContext = React.createContext<LayoutContextValues>({
    appBarHeight: 0,
    navigationButtonItems: [],
    setNavigationButtonItems() {},
});

export default class Layout extends React.Component<LayoutProps, LayoutStates> {
    public state: LayoutStates = {
        appBarHeight: 0,
        navigationButtonItems: [],
    };

    private setNavigationButtonItems = (items: NavigationButtonItem[]) => {
        this.setState({
            navigationButtonItems: cloneDeep(items),
        });
    };
    private handleAppBarHeightChange = (height: number) => {
        this.setState({
            appBarHeight: height,
        });
    };

    public render() {
        const { children, title, withoutPadding } = this.props;
        const { appBarHeight, navigationButtonItems } = this.state;

        return (
            <LayoutContext.Provider value={{ navigationButtonItems, appBarHeight, setNavigationButtonItems: this.setNavigationButtonItems }}>
                <Global styles={GlobalStyle} />
                <Header buttons={navigationButtonItems} title={title} onAppBarHeightChange={this.handleAppBarHeightChange} />
                <Root withoutPadding={withoutPadding}>
                    <Drawer />
                    <Main>
                        <Toolbar />
                        {children}
                    </Main>
                </Root>
            </LayoutContext.Provider>
        );
    }
}

export function useLayout() {
    return React.useContext(LayoutContext);
}
