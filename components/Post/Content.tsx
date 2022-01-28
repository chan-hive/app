import React from "react";

import { Typography } from "@mui/material";

import PostQuoteLink from "@components/Post/QuoteLink";

import { Quote, Root, Text } from "@components/Post/Content.styles";

import { PostContent as PostContentType, PostContentItem, QuoteLinkPostContent, QuotePostContent, TextPostContent } from "@utils/parsePostContent";
import { ThreadPost } from "@utils/types";

export interface PostContentProps {
    content: PostContentType;
    post: ThreadPost;
}
export interface PostContentStates {}

class PostContent extends React.PureComponent<PostContentProps, PostContentStates> {
    private renderText = (item: TextPostContent, key: number) => <Text key={key}>{item.content}</Text>;
    private renderQuote = (item: QuotePostContent, key: number): JSX.Element => <Quote key={key}>{item.content}</Quote>;
    private renderQuoteLink = (item: QuoteLinkPostContent, key: number): JSX.Element => {
        return <PostQuoteLink key={key} item={item} />;
    };
    private renderItem = (item: PostContentItem, key: number) => {
        switch (item.type) {
            case "quotelink":
                return this.renderQuoteLink(item, key);

            case "quote":
                return this.renderQuote(item, key);

            case "text":
                return this.renderText(item, key);

            default:
                return null;
        }
    };
    private renderLine = (line: PostContentType[0], index: number) => {
        return (
            <Typography key={+index} variant="body1">
                {line.length > 0 ? line.map(this.renderItem) : <React.Fragment key={+index}>&nbsp;</React.Fragment>}
            </Typography>
        );
    };
    public render() {
        const { content } = this.props;
        if (content.length <= 0) {
            return null;
        }

        return <Root>{content.map(this.renderLine)}</Root>;
    }
}

export default PostContent;
