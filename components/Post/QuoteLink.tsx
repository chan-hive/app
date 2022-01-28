import React from "react";

import { withThread, WithThreadProps } from "@components/Thread/withThread";
import { Root } from "@components/Post/QuoteLink.styles";

import { QuoteLinkPostContent } from "@utils/parsePostContent";

export interface PostQuoteLinkProps {
    item: QuoteLinkPostContent;
}
export interface PostQuoteLinkStates {}

class PostQuoteLink extends React.Component<PostQuoteLinkProps & WithThreadProps, PostQuoteLinkStates> {
    private handleMouseOver = () => {
        this.props.setFocusedThreadId(this.props.item.postId);
    };
    private handleMouseOut = () => {
        this.props.setFocusedThreadId(null);
    };

    public render() {
        const { item } = this.props;

        return <Root onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>{`>>${item.postId}`}</Root>;
    }
}

export default withThread(PostQuoteLink);
