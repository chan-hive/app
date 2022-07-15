import React from "react";

import { WithThreadProps } from "@components/Thread/withThread";

import { Anchor, Item, Root } from "@components/Post/ContentRenderer.styles";

import {
    CrossThreadQuoteLinkContentItem,
    PostContentItem,
    PostContentRow,
    QuoteContentItem,
    QuoteLinkContentItem,
    TextContentItem,
    ThreadPost,
    ThreadPostContent,
} from "@utils/types";

export interface ContentRendererProps extends WithThreadProps {
    content: ThreadPostContent;

    getOnQuoteLinkMouseOver(id: ThreadPost["id"] | null): React.MouseEventHandler;
    onQuoteLinkMouseOut(): void;

    onQuoteLinkClick(e: React.MouseEvent<HTMLAnchorElement>): void;
}

class ContentRenderer extends React.PureComponent<ContentRendererProps> {
    public renderTextContent = (item: TextContentItem, index: number) => {
        return <Item key={index}>{item.text}</Item>;
    };
    public renderQuoteContent = (item: QuoteContentItem, index: number) => {
        return (
            <Item key={index} monospaced green>
                {item.quote}
            </Item>
        );
    };
    public renderQuoteLinkContent = (item: QuoteLinkContentItem, index: number) => {
        return (
            <Anchor
                key={index}
                href="#"
                onMouseOver={this.props.getOnQuoteLinkMouseOver(item.postId)}
                onMouseOut={this.props.onQuoteLinkMouseOut}
                onClick={this.props.onQuoteLinkClick}
                data-target-id={item.postId}
            >
                &gt;&gt;{item.postId} {item.isOP ? "(OP)" : ""}
            </Anchor>
        );
    };
    public renderCrossThreadQuoteLinkContent = (item: CrossThreadQuoteLinkContentItem, index: number) => {
        return <Item key={index}>{item.targetPostId}</Item>;
    };
    private renderContent = (item: PostContentItem, index: number) => {
        switch (item.__typename) {
            case "TextContent":
                return this.renderTextContent(item, index);

            case "QuoteContent":
                return this.renderQuoteContent(item, index);

            case "QuoteLinkContent":
                return this.renderQuoteLinkContent(item, index);

            case "CrossThreadQuoteLinkContent":
                return this.renderCrossThreadQuoteLinkContent(item, index);

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
