import React from "react";

import { PostFile } from "@utils/types";

import { Image, Video } from "@components/UI/MediaViewer.styles";

export interface MediaViewerProps extends React.HTMLAttributes<HTMLVideoElement | HTMLImageElement> {
    file: PostFile;
}

const MediaViewer = React.forwardRef<HTMLVideoElement | HTMLImageElement, MediaViewerProps>(({ file, ...rest }: MediaViewerProps, ref) => {
    if (file.isVideo) {
        return <Video ref={ref as React.ForwardedRef<HTMLVideoElement>} {...rest} loop controls width={file.width} height={file.height} src={file.url} />;
    }

    return <Image ref={ref as React.ForwardedRef<HTMLImageElement>} src={file.url} {...rest} />;
});

export default MediaViewer;
