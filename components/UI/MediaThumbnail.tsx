import React from "react";

import { useLayout } from "@components/Layout";

import { Root } from "@components/UI/MediaThumbnail.styles";

import { PostFile } from "@utils/types";

export interface MediaThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
    file: PostFile;
}

export default function MediaThumbnail({ file, onMouseOver, onMouseOut, ...rest }: MediaThumbnailProps) {
    const thumbnailRef = React.useRef<HTMLDivElement | null>(null);
    const { setPreviewTargetFile } = useLayout();
    const handleMouseOver = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!thumbnailRef.current) {
                return;
            }

            setPreviewTargetFile([file, thumbnailRef.current]);

            if (onMouseOver) {
                onMouseOver(e);
            }
        },
        [setPreviewTargetFile],
    );
    const handleMouseOut = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            setPreviewTargetFile(null);

            if (onMouseOut) {
                onMouseOut(e);
            }
        },
        [setPreviewTargetFile],
    );

    React.useEffect(() => {
        return () => {
            setPreviewTargetFile(null);
        };
    }, []);

    return (
        <Root ref={thumbnailRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} {...rest}>
            <img src={file.thumbnailUrl} alt={`${file.name}${file.extension}`} loading="lazy" />
        </Root>
    );
}
