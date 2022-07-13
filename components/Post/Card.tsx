import React, { MouseEvent } from "react";
import moment from "moment";

import ContentRenderer from "@components/Post/ContentRenderer";

import { Content, Formatted, ThumbnailViewer, Metadata, Root, Video } from "@components/Post/Card.styles";

import { preloadMedia } from "@utils/preloadMedia";
import { ThreadPost } from "@utils/types";

// eslint-disable-next-line no-shadow
export enum MediaStatus {
    Ready,
    Loading,
    Expanded,
}

export interface PostCardProps {
    post: ThreadPost;
}
export interface PostCardStates {
    formattedDate: string;
    fromNow: string;
    mediaStatus: MediaStatus;
}

export default class PostCard extends React.Component<PostCardProps, PostCardStates> {
    public state: PostCardStates = {
        formattedDate: moment(this.props.post.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        fromNow: moment(this.props.post.createdAt).fromNow(),
        mediaStatus: MediaStatus.Ready,
    };

    public handleThumbnailClick = () => {
        if (this.state.mediaStatus !== MediaStatus.Ready || !this.props.post.file) {
            return;
        }

        this.setState(
            {
                mediaStatus: MediaStatus.Loading,
            },
            () => {
                preloadMedia(this.props.post.file!).then(() => {
                    this.setState({
                        mediaStatus: MediaStatus.Expanded,
                    });
                });
            },
        );
    };

    public handleVideoClick = (event: MouseEvent<HTMLVideoElement>) => {
        this.setState({ mediaStatus: MediaStatus.Ready });
        event.preventDefault();
    };

    render() {
        const { post } = this.props;
        const { formattedDate, fromNow, mediaStatus } = this.state;

        return (
            <Root>
                <Metadata>
                    {post.isOP && <Formatted color="rgb(180, 51, 211)">{post.title}</Formatted>}
                    <Formatted bold color="rgb(0, 101, 0)">
                        {post.name}
                    </Formatted>
                    <time dateTime={post.createdAt} title={fromNow}>
                        {formattedDate}
                    </time>
                    {post.file && (
                        <a rel="noreferrer nofollow" href={post.file.url} target="_blank">
                            {post.file.name}
                            {post.file.extension}
                        </a>
                    )}
                </Metadata>
                <Content wrap={mediaStatus === MediaStatus.Expanded}>
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
                            autoPlay
                            loop
                            controls
                            src={post.file.url}
                            onClick={this.handleVideoClick}
                            style={{
                                aspectRatio: `${post.file.width} / ${post.file.height}`,
                            }}
                        />
                    )}
                    {post.content.length > 0 && <ContentRenderer content={post.content} />}
                </Content>
            </Root>
        );
    }
}
