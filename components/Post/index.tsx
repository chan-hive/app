import React from "react";

import PostContent from "@components/Post/Content";
import PostMetadata from "@components/Post/Metadata";
import PostAttachment from "@components/Post/Attachment";
import { withThread, WithThreadProps } from "@components/Thread/withThread";

import { Body, Card, ModalRoot, Root, ThumbnailWrapper } from "@components/Post/index.styles";

import { ThreadPost } from "@utils/types";
import { ModalHelper } from "@utils/modal-helper";

export interface PostProps {
    post: ThreadPost;
    modal?: boolean;
}
export interface PostStates {
    expanded: boolean;
}

class Post extends React.PureComponent<PostProps & WithThreadProps, PostStates> {
    private lastDOM: HTMLDivElement | null = null;

    public state: PostStates = {
        expanded: false,
    };

    private handleCardRef = (dom: HTMLDivElement | null) => {
        if (!dom) {
            this.props.unregisterDOMObject(this.props.post.id);
            return;
        }

        this.props.registerDOMObject(this.props.post.id, dom);
    };
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
    private handleExpandedStateChange = (expanded: boolean) => {
        this.setState({
            expanded,
        });
    };

    public render() {
        const { post, modal } = this.props;
        const { expanded } = this.state;

        const content = (
            <Card ref={modal ? undefined : this.handleCardRef} id={!modal ? `p${post.id}` : undefined} variant="outlined">
                <Root>
                    <PostMetadata post={post} />
                    <Body expanded={expanded}>
                        {post.file && (
                            <ThumbnailWrapper expanded={expanded}>
                                <PostAttachment onExpandedStateChange={this.handleExpandedStateChange} file={post.file} />
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

export default withThread(Post);
