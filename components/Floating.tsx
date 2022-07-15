import React from "react";
import ReactDOM from "react-dom";

import { Root } from "@components/Floating.styles";
import { FloatHelper } from "@utils/float-helper";

export interface FloatingProps {
    children: React.ReactNode;
    className?: string;
}
export interface FloatingStates {
    element: HTMLDivElement | null;
}

export default class Floating extends React.Component<FloatingProps, FloatingStates> {
    private root: HTMLDivElement | null = null;

    public state: FloatingStates = {
        element: null,
    };

    public componentDidMount() {
        if (typeof window === "undefined") {
            return;
        }

        const container = document.querySelector<HTMLDivElement>("#float-container");
        if (!container) {
            return;
        }

        this.setState({ element: container });
    }
    public componentWillUnmount() {
        if (!this.state.element) {
            return;
        }

        FloatHelper.Instance.unregister(this.state.element);
    }

    private handleRootDOM = (dom?: HTMLDivElement | null) => {
        if (!dom) {
            return;
        }

        if (this.root) {
            FloatHelper.Instance.unregister(this.root);
        }

        this.root = dom;
        FloatHelper.Instance.register(dom);
    };

    public render() {
        const { element } = this.state;
        if (!element) return null;

        const { children, className } = this.props;
        const content = (
            <Root className={className} ref={this.handleRootDOM}>
                {children}
            </Root>
        );

        return ReactDOM.createPortal(content, element);
    }
}
