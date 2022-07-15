/* eslint-disable no-param-reassign */
import React from "react";

import Floating from "@components/Floating";

import { Image, Video } from "@components/UI/MediaViewer.styles";

import VideoHelper from "@utils/video-helper";
import { PostFile } from "@utils/types";

export interface MediaPreviewProps {
    target: [PostFile, HTMLDivElement];
}

export default class MediaPreview extends React.Component<MediaPreviewProps> {
    public componentWillUnmount() {
        if (!this.props.target[0].isVideo) {
            return;
        }

        VideoHelper.Instance.unregister(this.props.target[0].id);
    }

    private handleVideoDOM = async (dom?: HTMLVideoElement | null) => {
        if (!dom) {
            return;
        }

        const lastPosition = VideoHelper.Instance.getLastPosition(this.props.target[0].id);
        if (lastPosition) {
            dom.currentTime = lastPosition;
            dom.volume = VideoHelper.Instance.getVolume();
        }

        await dom.play();
        VideoHelper.Instance.register(this.props.target[0].id, dom, this.props.target[1]);
    };

    public renderContent = () => {
        const {
            target: [file],
        } = this.props;

        if (file.isVideo) {
            return <Video ref={this.handleVideoDOM} loop autoPlay width={file.width} height={file.height} src={file.url} />;
        }

        return <Image src={file.url} />;
    };

    render() {
        return <Floating>{this.renderContent()}</Floating>;
    }
}
