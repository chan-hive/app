import React from "react";
import memoizeOne from "memoize-one";

import { WithThreadProps } from "@components/thread/withThread";
import PostCard from "@components/post/Card";

import { Anchor, Item, Root } from "@components/post/ContentRenderer.styles";

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
    referredBy?: ThreadPost["id"];

    getOnQuoteLinkMouseOver(id: ThreadPost["id"] | null): React.MouseEventHandler;
    onQuoteLinkMouseOut(): void;
}
export interface ContentRendererStates {
    openedQuoteLinks: QuoteLinkContentItem[];
}

class ContentRenderer extends React.PureComponent<ContentRendererProps> {
    public state: ContentRendererStates = {
        openedQuoteLinks: [],
    };

    private handleQuoteLinkClick = memoizeOne((item: QuoteLinkContentItem) => {
        return (e: React.MouseEvent) => {
            this.props.onQuoteLinkMouseOut();
            e.preventDefault();

            if (item.postId === this.props.referredBy) {
                return;
            }

            this.setState((prevState: ContentRendererStates) => ({
                openedQuoteLinks:
                    prevState.openedQuoteLinks.indexOf(item) >= 0
                        ? prevState.openedQuoteLinks.filter(oql => oql !== item)
                        : [...prevState.openedQuoteLinks, item],
            }));
        };
    });

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { content, onQuoteLinkMouseOut, getOnQuoteLinkMouseOver, ...rest } = this.props;
        const { openedQuoteLinks } = this.state;
        const isOpened = openedQuoteLinks.indexOf(item) >= 0;
        const targetPost = rest.postMap[item.postId];

        return (
            <React.Fragment key={index}>
                <Anchor
                    href="#"
                    onMouseOver={!isOpened ? this.props.getOnQuoteLinkMouseOver(item.postId) : undefined}
                    onMouseOut={!isOpened ? this.props.onQuoteLinkMouseOut : undefined}
                    onClick={this.handleQuoteLinkClick(item)}
                    data-target-id={item.postId}
                    referred={isOpened}
                >
                    &gt;&gt;{item.postId} {item.isOP ? "(OP)" : ""}
                </Anchor>
                {isOpened && targetPost && <PostCard {...rest} highlighted={false} post={targetPost} />}
            </React.Fragment>
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
