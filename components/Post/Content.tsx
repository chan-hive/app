import React from "react";

import { Typography } from "@mui/material";

import PostQuoteLink from "@components/Post/QuoteLink";

import { Quote, Root, Text } from "@components/Post/Content.styles";

import { PostContentItem, PostContentRow, QuoteContentItem, QuoteLinkContentItem, TextContentItem, ThreadPost } from "@utils/types";

export interface PostContentProps {
    content: ThreadPost["content"];
    post: ThreadPost;
}
export interface PostContentStates {}

class PostContent extends React.PureComponent<PostContentProps, PostContentStates> {
    private renderText = (item: TextContentItem, key: number) => <Text key={key}>{item.text}</Text>;
    private renderQuote = (item: QuoteContentItem, key: number): JSX.Element => <Quote key={key}>{item.quote}</Quote>;
    private renderQuoteLink = (item: QuoteLinkContentItem, key: number): JSX.Element => {
        return <PostQuoteLink key={key} item={item} />;
    };
    private renderItem = (item: PostContentItem, key: number) => {
        switch (item.__typename) {
            case "QuoteLinkContent":
                return this.renderQuoteLink(item, key);

            case "QuoteContent":
                return this.renderQuote(item, key);

            case "TextContent":
                return this.renderText(item, key);

            default:
                return null;
        }
    };
    private renderRow = ({ contents }: PostContentRow, index: number) => {
        return (
            <Typography key={+index} variant="body1">
                {contents.length > 0 ? contents.map(this.renderItem) : <React.Fragment key={+index}>&nbsp;</React.Fragment>}
            </Typography>
        );
    };
    public render() {
        const { content } = this.props;
        if (content.length <= 0) {
            return null;
        }

        return <Root>{content.map(this.renderRow)}</Root>;
    }
}

export default PostContent;
