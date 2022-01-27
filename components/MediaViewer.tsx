import React from "react";

import { FileInformation } from "@utils/types";

type InternalProps = "className";

export type MediaViewerProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, InternalProps> &
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, InternalProps> & {
        file: FileInformation;
        innerRef: React.Ref<any>;
        className?: string;
    };
export interface MediaViewerStates {}

export default class MediaViewer extends React.Component<MediaViewerProps, MediaViewerStates> {
    private renderVideo = () => {
        const { file, innerRef, className, ...rest } = this.props;

        // eslint-disable-next-line jsx-a11y/media-has-caption
        return <video className={className} ref={innerRef} src={file.url} width={file.width} height={file.height} {...rest} />;
    };

    public render() {
        const { file, innerRef, className, ...rest } = this.props;

        if (file.extension.endsWith("webm")) {
            return this.renderVideo();
        }

        return (
            <img className={className} ref={innerRef} src={file.url} alt={`${file.name}${file.extension}`} width={file.width} height={file.height} {...rest} />
        );
    }
}
