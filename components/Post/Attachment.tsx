import React from "react";

import Thumbnail from "@components/Thumbnail";

import { Media, Root, ThumbnailWrapper } from "@components/Post/Attachment.styles";

import { FileInformation } from "@utils/types";
import { VideoHelper } from "@utils/video-helper";

export interface PostAttachmentProps {
    file: FileInformation;
    onExpandedStateChange(expanded: boolean): void;
}
export interface PostAttachmentStates {
    expanded: boolean;
    loaded: boolean;
}

export default class PostAttachment extends React.Component<PostAttachmentProps, PostAttachmentStates> {
    public state: PostAttachmentStates = {
        expanded: false,
        loaded: false,
    };

    public componentDidUpdate(prevProps: Readonly<PostAttachmentProps>, prevState: Readonly<PostAttachmentStates>) {
        if (prevState.loaded !== this.state.loaded || prevState.expanded !== this.state.expanded) {
            this.props.onExpandedStateChange(this.state.loaded && this.state.expanded);
        }
    }

    private handleClick = () => {
        VideoHelper.instance.saveCurrentTime(this.props.file);

        this.setState((prevStates: PostAttachmentStates) => ({
            expanded: !prevStates.expanded,
            loaded: false,
        }));
    };
    private handleLoaded = () => {
        this.setState({
            loaded: true,
        });
    };

    private renderContent = () => {
        const { file } = this.props;
        const { expanded, loaded } = this.state;

        return (
            <>
                {expanded && (
                    <Media
                        installVideoHelper
                        file={file}
                        loop
                        controls
                        onLoadedMetadata={this.handleLoaded}
                        onCanPlayThrough={this.handleLoaded}
                        onLoad={this.handleLoaded}
                        style={{ display: !loaded ? "none" : "block" }}
                    />
                )}
                <ThumbnailWrapper loading={expanded && !loaded} style={{ display: expanded && loaded ? "none" : "block" }}>
                    <Thumbnail file={file} />
                </ThumbnailWrapper>
            </>
        );
    };
    public render() {
        return (
            <Root role="button" tabIndex={-1} onClick={this.handleClick}>
                {this.renderContent()}
            </Root>
        );
    }
}
