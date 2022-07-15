/* eslint-disable no-param-reassign */
import React, { MouseEvent } from "react";
import moment from "moment";
import memoizeOne from "memoize-one";

import ContentRenderer from "@components/Post/ContentRenderer";
import { withThread, WithThreadProps } from "@components/Thread/withThread";

import { Content, Formatted, ThumbnailViewer, Metadata, Root, Video, Image, Attached, Reply, PostFloating, ReferredCards } from "@components/Post/Card.styles";

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
    private handleVideoRef = async (dom?: HTMLVideoElement | null) => {
        if (!dom) {
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
    public handleVideoClick = (event: MouseEvent<any>) => {
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
    private renderContent = () => {
        const { post, highlighted, float = false, referredBy = false, ...rest } = this.props;
        const { formattedDate, fromNow, mediaStatus, referredCardIds } = this.state;
        const replies = rest.repliesMap[post.id];

        return (
            <Root ref={!float && !referredBy ? rest.postRef(post.id) : undefined} highlighted={highlighted}>
                <Metadata>
                    {post.isOP && <Formatted color="rgb(180, 51, 211)">{post.title}</Formatted>}
                    <Formatted bold color="rgb(0, 101, 0)">
                        {post.name}
                    </Formatted>
                    <time dateTime={post.createdAt} title={fromNow}>
                        {formattedDate}
                    </time>
                    <Formatted monospaced>No.{post.id}</Formatted>
                    {post.file && (
                        <Attached href={post.file.url}>
                            {post.file.name}
                            {post.file.extension}
                        </Attached>
                    )}
                    {replies!.map(this.renderReply)}
                </Metadata>
                {referredCardIds.length > 0 && <ReferredCards>{referredCardIds.map(this.renderReferredCard)}</ReferredCards>}
                <Content shouldWrap={mediaStatus === MediaStatus.Expanded}>
                    {post.file && mediaStatus !== MediaStatus.Expanded && (
                        <ThumbnailViewer
                            role="button"
                            tabIndex={-1}
                            onClick={this.handleThumbnailClick}
                            style={{
                                opacity: mediaStatus === MediaStatus.Loading ? 0.5 : 1,
                                backgroundImage: `url(${post.file.thumbnailUrl})`,
                                aspectRatio: `${post.file.thumbnailWidth} / ${post.file.thumbnailHeight}`,
                            }}
                        />
                    )}
                    {post.file && mediaStatus === MediaStatus.Expanded && post.file.isVideo && (
                        <Video
                            ref={this.handleVideoRef}
                            loop
                            controls
                            width={post.file.width}
                            height={post.file.height}
                            src={post.file.url}
                            onClick={this.handleVideoClick}
                            style={{
                                aspectRatio: `${post.file.width} / ${post.file.height}`,
                            }}
                        />
                    )}
                    {post.file && mediaStatus === MediaStatus.Expanded && !post.file.isVideo && (
                        <Image
                            src={post.file.url}
                            onClick={this.handleVideoClick}
                            style={{
                                aspectRatio: `${post.file.width} / ${post.file.height}`,
                            }}
                        />
                    )}
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
