import React from "react";

import { withThread, WithThreadProps } from "@components/Thread/withThread";
import { Root } from "@components/Post/QuoteLink.styles";

import { QuoteLinkPostContent } from "@utils/parsePostContent";

export interface PostQuoteLinkProps {
    item: QuoteLinkPostContent;
}
export interface PostQuoteLinkStates {}

class PostQuoteLink extends React.PureComponent<PostQuoteLinkProps & WithThreadProps, PostQuoteLinkStates> {
    private handleMouseOver = () => {
        this.props.setFocusedThreadId(this.props.item.postId);
    };
    private handleMouseOut = () => {
        this.props.setFocusedThreadId(null);
    };
    private handleClick = (e: React.MouseEvent) => {
        this.props.scrollTo(this.props.item.postId);
        e.preventDefault();
    };

    public render() {
        const { item } = this.props;

        return (
            <Root href={`#p${item.postId}`} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                {`>>${item.postId}${item.isOP ? ` (OP)` : ""}`}
            </Root>
        );
    }
}

export default withThread(PostQuoteLink);
