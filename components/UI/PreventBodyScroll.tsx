import React from "react";

export const NO_SCROLL_CLASSNAME = "no-scrolling";

export default class PreventBodyScroll extends React.Component {
    public componentDidMount() {
        document.body.classList.add(NO_SCROLL_CLASSNAME);
    }
    public componentWillUnmount() {
        document.body.classList.remove(NO_SCROLL_CLASSNAME);
    }

    public render() {
        return null;
    }
}
