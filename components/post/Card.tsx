/* eslint-disable no-param-reassign */
import React, { MouseEvent } from "react";
import moment from "moment";
import memoizeOne from "memoize-one";

import ContentRenderer from "@components/post/ContentRenderer";
import { withThread, WithThreadProps } from "@components/thread/withThread";

import {
    Content,
    Formatted,
    ThumbnailViewer,
    Metadata,
    Root,
    Attached,
    Reply,
    PostFloating,
    ReferredCards,
    Media,
    MobileRoot,
    MobileThumbnail,
    MobileContent,
} from "@components/post/Card.styles";

import { isMediaCached, preloadMedia } from "@utils/preloadMedia";
import VideoHelper from "@utils/video-helper";
import { ThreadPost } from "@utils/types";

// eslint-disable-next-line no-shadow
export enum MediaStatus {
    Ready,
    Loading,
    Expanded,
}

export interface PostCardProps extends WithThreadProps {
    float?: boolean;
    referredBy?: ThreadPost["id"];
    post: ThreadPost;
    highlighted: boolean;
    mobile?: boolean;
}
export interface PostCardStates {
    formattedDate: string;
    fromNow: string;
    mediaStatus: MediaStatus;
    referredCardIds: ThreadPost["id"][];
}

class PostCard extends React.PureComponent<PostCardProps, PostCardStates> {
    public state: PostCardStates = {
        formattedDate: moment(this.props.post.createdAt).format("YY/MM/DD(ddd)HH:mm:ss"),
        fromNow: moment(this.props.post.createdAt).fromNow(),
        mediaStatus: MediaStatus.Ready,
        referredCardIds: [],
    };

    public componentWillUnmount() {
        this.unregisterVideoElement();
    }

    private handleReplyMouseOver = memoizeOne((id: ThreadPost["id"]) => {
        return () => {
            this.props.setHighlightedPost(id);
        };
    });
    private handleReplyMouseOut = () => {
        this.props.setHighlightedPost(null);
    };
    private handleVideoRef = async (dom?: HTMLVideoElement | HTMLImageElement | null) => {
        if (!dom || dom instanceof HTMLImageElement) {
            return;
        }

        const lastPosition = VideoHelper.Instance.getLastPosition(this.props.post.file!.id);
        if (lastPosition) {
            dom.currentTime = lastPosition;
            dom.volume = VideoHelper.Instance.getVolume();
        }

        await dom.play();
        this.registerVideoElement(dom);
    };
    private handleThumbnailClick = () => {
        if (this.state.mediaStatus !== MediaStatus.Ready || !this.props.post.file) {
            return;
        }

        const mediaCached = isMediaCached(this.props.post.file!);
        const targetMediaStatus: MediaStatus = mediaCached ? MediaStatus.Expanded : MediaStatus.Loading;

        this.setState(
            {
                mediaStatus: targetMediaStatus,
            },
            () => {
                if (!mediaCached) {
                    preloadMedia(this.props.post.file!).then(() => {
                        this.setState({
                            mediaStatus: MediaStatus.Expanded,
                        });
                    });
                }
            },
        );
    };
    private handleQuoteLinkClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const idData = e.currentTarget.getAttribute("data-target-id");
        if (!idData) {
            return;
        }

        const id = parseInt(idData, 10);
        this.handleReplyMouseOut();
        this.setState((prevStates: PostCardStates) => ({
            referredCardIds:
                prevStates.referredCardIds.indexOf(id) >= 0 ? prevStates.referredCardIds.filter(i => i !== id) : [...prevStates.referredCardIds, id],
        }));
    };
    public handleMediaClick = (event: MouseEvent<any>) => {
        this.setState({ mediaStatus: MediaStatus.Ready });
        this.unregisterVideoElement();
        event.preventDefault();
    };

    public registerVideoElement = (dom: HTMLVideoElement) => {
        if (!this.props.post.file?.isVideo) {
            return;
        }

        VideoHelper.Instance.register(this.props.post.file.id, dom);
    };
    public unregisterVideoElement = () => {
        if (!this.props.post.file?.isVideo) {
            return;
        }

        VideoHelper.Instance.unregister(this.props.post.file.id);
    };

    private renderReply = (reply: ThreadPost["id"]) => {
        const isReferred = this.state.referredCardIds.indexOf(reply) >= 0;

        return (
            <Reply
                href={`#p-${reply}`}
                onMouseOver={!isReferred ? this.handleReplyMouseOver(reply) : undefined}
                onMouseOut={!isReferred ? this.handleReplyMouseOut : undefined}
                key={reply}
                data-target-id={reply}
                onClick={this.handleQuoteLinkClick}
                referred={isReferred}
            >
                &gt;&gt;{reply}
            </Reply>
        );
    };
    private renderReferredCard = (id: ThreadPost["id"]) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { post, float, referredBy, highlighted, ...rest } = this.props;

        const targetPost = this.props.postMap[id];
        if (!targetPost) {
            return null;
        }

        return <PostCard key={id} referredBy={this.props.post.id} post={targetPost} highlighted={false} {...rest} />;
    };
    private renderDesktopMedia = () => {
        const { post } = this.props;
        const { mediaStatus } = this.state;

        return (
            <>
                {post.file && mediaStatus !== MediaStatus.Expanded && (
                    <ThumbnailViewer
                        role="button"
                        tabIndex={-1}
                        onClick={this.handleThumbnailClick}
                        file={post.file}
                        style={{
                            opacity: mediaStatus === MediaStatus.Loading ? 0.5 : 1,
                        }}
                    />
                )}
                {post.file && mediaStatus === MediaStatus.Expanded && (
                    <Media
                        file={post.file}
                        ref={this.handleVideoRef}
                        onClick={this.handleMediaClick}
                        style={{
                            aspectRatio: `${post.file.width} / ${post.file.height}`,
                        }}
                    />
                )}
            </>
        );
    };
    private renderMetadata = () => {
        const { post, mobile, ...rest } = this.props;
        const { formattedDate, fromNow } = this.state;
        const replies = rest.repliesMap[post.id];
        const showName = mobile ? post.name !== "Anonymous" : true;

        return (
            <Metadata>
                {post.isOP && <Formatted color="rgb(180, 51, 211)">{post.title}</Formatted>}
                {showName && (
                    <Formatted bold color="rgb(0, 101, 0)">
                        {post.name}
                    </Formatted>
                )}
                <time dateTime={post.createdAt} title={fromNow}>
                    {mobile ? fromNow : formattedDate}
                </time>
                <Formatted monospaced>No.{post.id}</Formatted>
                {post.file && !mobile && (
                    <Attached href={post.file.url}>
                        {post.file.name}
                        {post.file.extension}
                    </Attached>
                )}
                {!mobile && replies!.map(this.renderReply)}
            </Metadata>
        );
    };
    private renderContent = () => {
        const { post, highlighted, float = false, referredBy, mobile, ...rest } = this.props;
        const { mediaStatus, referredCardIds } = this.state;

        const shouldRenderContent = mobile ? post.content.length > 0 : true;
        const metadata = this.renderMetadata();

        let contentSideMedia: React.ReactNode = null;
        if (!mobile) {
            contentSideMedia = this.renderDesktopMedia();
        }

        let content: React.ReactNode = null;
        if (shouldRenderContent) {
            content = (
                <Content shouldWrap={mediaStatus === MediaStatus.Expanded}>
                    {contentSideMedia}
                    {post.content.length > 0 && (
                        <ContentRenderer
                            referredBy={referredBy}
                            getOnQuoteLinkMouseOver={this.handleReplyMouseOver}
                            onQuoteLinkMouseOut={this.handleReplyMouseOut}
                            {...rest}
                            content={post.content}
                        />
                    )}
                </Content>
            );
        }

        let children: React.ReactNode;
        if (mobile) {
            children = (
                <MobileRoot>
                    {post.file && <MobileThumbnail style={{ backgroundImage: `url(${post.file.thumbnailUrl})` }} />}
                    <MobileContent>
                        {metadata}
                        {content}
                    </MobileContent>
                </MobileRoot>
            );
        } else {
            children = (
                <>
                    {metadata}
                    {!mobile && referredCardIds.length > 0 && <ReferredCards>{referredCardIds.map(this.renderReferredCard)}</ReferredCards>}
                    {content}
                </>
            );
        }

        return (
            <Root ref={!float && !referredBy ? rest.postRef(post.id) : undefined} highlighted={highlighted}>
                {children}
            </Root>
        );
    };
    public render() {
        const { float = false } = this.props;
        const content = this.renderContent();

        if (float) {
            return <PostFloating>{content}</PostFloating>;
        }

        return content;
    }
}

export default withThread(PostCard);
