/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";

import { FileInformation } from "@utils/types";
import { VideoHelper } from "@utils/video-helper";

type InternalProps = "className";

export type MediaViewerProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, InternalProps> &
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, InternalProps> & {
        file: FileInformation;
        innerRef?: React.Ref<any>;
        className?: string;
        installVideoHelper?: boolean;
    };
export interface MediaViewerStates {}

export default class MediaViewer extends React.Component<MediaViewerProps, MediaViewerStates> {
    private videoDOM: HTMLVideoElement | null = null;

    public componentWillUnmount() {
        if (this.videoDOM) {
            VideoHelper.instance.removeElement(this.props.file, this.videoDOM);
        }
    }

    private handleVideoRef = (dom?: HTMLVideoElement | null) => {
        if (!dom) {
            if (this.videoDOM) {
                VideoHelper.instance.removeElement(this.props.file, this.videoDOM);
            }

            this.videoDOM = null;
            return;
        }

        this.videoDOM = dom;
        VideoHelper.instance.addElement(this.props.file, this.videoDOM);
    };

    private renderVideo = () => {
        const { file, innerRef, className, installVideoHelper, ...rest } = this.props;

        return (
            <video
                className={className}
                ref={installVideoHelper ? this.handleVideoRef : innerRef}
                src={file.url}
                width={file.width}
                height={file.height}
                {...rest}
            />
        );
    };

    public render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { file, innerRef, className, installVideoHelper, ...rest } = this.props;

        if (file.extension.endsWith("webm")) {
            return this.renderVideo();
        }

        return (
            <img className={className} ref={innerRef} src={file.url} alt={`${file.name}${file.extension}`} width={file.width} height={file.height} {...rest} />
        );
    }
}
