import React from "react";

import { Anchor, Item, Root } from "@components/Post/ContentRenderer.styles";

import { PostContentItem, PostContentRow, QuoteContentItem, QuoteLinkContentItem, TextContentItem, ThreadPostContent } from "@utils/types";
import { CrossThreadQuoteLinkContent } from "queries/index";

export interface ContentRendererProps {
    content: ThreadPostContent;
}

class ContentRenderer extends React.PureComponent<ContentRendererProps> {
    public renderTextContent = (item: TextContentItem) => {
        return <Item>{item.text}</Item>;
    };
    public renderQuoteContent = (item: QuoteContentItem) => {
        return (
            <Item monospaced green>
                {item.quote}
            </Item>
        );
    };
    public renderQuoteLinkContent = (item: QuoteLinkContentItem) => {
        return (
            <Anchor href="#">
                &gt;&gt;{item.postId} {item.isOP ? "(OP)" : ""}
            </Anchor>
        );
    };
    public renderCrossThreadQuoteLinkContent = (item: CrossThreadQuoteLinkContent) => {
        return <Item>{item.targetPostId}</Item>;
    };
    private renderContent = (item: PostContentItem) => {
        switch (item.__typename) {
            case "TextContent":
                return this.renderTextContent(item);

            case "QuoteContent":
                return this.renderQuoteContent(item);

            case "QuoteLinkContent":
                return this.renderQuoteLinkContent(item);

            case "CrossThreadQuoteLinkContent":
                return this.renderCrossThreadQuoteLinkContent(item);

            default:
                return null;
        }
    };

    private renderLine = (item: PostContentRow, index: number) => {
        return <p key={index}>{item.contents.map(this.renderContent)}</p>;
    };

    public render() {
        const { content } = this.props;
        return <Root>{content.map(this.renderLine)}</Root>;
    }
}

export default ContentRenderer;
