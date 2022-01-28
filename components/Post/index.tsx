import React from "react";

import Thumbnail from "@components/Thumbnail";
import PostContent from "@components/Post/Content";
import PostMetadata from "@components/Post/Metadata";

import { Body, Card, ModalRoot, Root, ThumbnailWrapper } from "@components/Post/index.styles";

import { ThreadPost } from "@utils/types";
import { ModalHelper } from "@utils/modal-helper";

export interface PostProps {
    post: ThreadPost;
    modal?: boolean;
}
export interface PostStates {}

export default class Post extends React.Component<PostProps, PostStates> {
    private lastDOM: HTMLDivElement | null = null;

    private handleModalRef = (dom?: HTMLDivElement | null) => {
        if (!dom) {
            if (this.lastDOM) {
                ModalHelper.instance.unregister(this.lastDOM);
                this.lastDOM = null;
            }

            return;
        }

        ModalHelper.instance.register(dom);
        this.lastDOM = dom;
    };

    public render() {
        const { post, modal } = this.props;
        const content = (
            <Card variant="outlined">
                <Root>
                    <PostMetadata post={post} />
                    <Body>
                        {post.file && (
                            <ThumbnailWrapper>
                                <Thumbnail file={post.file} />
                            </ThumbnailWrapper>
                        )}
                        <PostContent post={post} content={post.content} />
                    </Body>
                </Root>
            </Card>
        );

        if (modal) {
            return <ModalRoot ref={this.handleModalRef}>{content}</ModalRoot>;
        }

        return content;
    }
}
