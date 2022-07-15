import React from "react";
import { cloneDeep } from "lodash";

import { Toolbar } from "@mui/material";
import { Global } from "@emotion/react";

import Header from "@components/Header";
import Drawer from "@components/Drawer";
import MediaPreview from "@components/MediaPreview";

import { GlobalStyle, Main, Root } from "@components/Layout.styles";

import { PostFile } from "@utils/types";

export interface LayoutProps {
    children: React.ReactNode;
    title?: string | null;
    withoutPadding?: boolean;
}
export interface LayoutStates {
    navigationButtonItems: NavigationButtonItem[];
    previewTarget: [PostFile, HTMLDivElement] | null;
}

export interface NavigationButtonItem {
    icon: React.ComponentType;
    onClick(e: React.MouseEvent): void;
    name: string;
    label: string;
}

export interface LayoutContextValues {
    navigationButtonItems: NavigationButtonItem[];
    setNavigationButtonItems(items: NavigationButtonItem[]): void;
    setPreviewTargetFile(previewTarget: [PostFile, HTMLDivElement] | null): void;
}

const LayoutContext = React.createContext<LayoutContextValues>({
    navigationButtonItems: [],
    setNavigationButtonItems() {},
    setPreviewTargetFile() {},
});

export default class Layout extends React.Component<LayoutProps, LayoutStates> {
    public state: LayoutStates = {
        navigationButtonItems: [],
        previewTarget: null,
    };

    private setNavigationButtonItems = (items: NavigationButtonItem[]) => {
        this.setState({
            navigationButtonItems: cloneDeep(items),
        });
    };
    private setPreviewTargetFile = (file: [PostFile, HTMLDivElement] | null) => {
        this.setState({
            previewTarget: file,
        });
    };

    public render() {
        const { children, title, withoutPadding } = this.props;
        const { navigationButtonItems, previewTarget } = this.state;

        return (
            <LayoutContext.Provider
                value={{
                    navigationButtonItems,
                    setNavigationButtonItems: this.setNavigationButtonItems,
                    setPreviewTargetFile: this.setPreviewTargetFile,
                }}
            >
                <Global styles={GlobalStyle} />
                <Header buttons={navigationButtonItems} title={title} />
                <Root withoutPadding={withoutPadding}>
                    <Drawer />
                    <Main>
                        <Toolbar />
                        {children}
                    </Main>
                </Root>
                {previewTarget && <MediaPreview target={previewTarget} />}
            </LayoutContext.Provider>
        );
    }
}

export function useLayout() {
    return React.useContext(LayoutContext);
}
