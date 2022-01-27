import React from "react";
import Link from "next/link";

import { withState, WithStateProps } from "@components/HOC/withState";

import { previewState } from "@states/preview";

import { LinkRoot, Root } from "@components/Thumbnail.styles";

import { ThumbnailHelper } from "@utils/thumbnail-helper";
import { FileInformation, RecoilStateValue } from "@utils/types";

export interface ThumbnailProps {
    size?: {
        width: number | string;
        height: number | string;
    };
    file: FileInformation;
    href?: string;
    as?: string;
    disablePreview?: boolean;
    mosaic?: boolean;
}
export interface ThumbnailStates {}

class Thumbnail extends React.Component<ThumbnailProps & WithStateProps<RecoilStateValue<typeof previewState>>, ThumbnailStates> {
    private readonly domRef = React.createRef<any>();

    public componentDidMount() {
        if (!this.props.disablePreview && this.domRef.current) {
            const target: HTMLAnchorElement | HTMLDivElement = this.domRef.current;
            ThumbnailHelper.instance.subscribe(target, this.props.file);
        }
    }
    public componentWillUnmount() {
        ThumbnailHelper.instance.unsubscribe(this.props.file);
    }

    public handleMouseOver = () => {
        this.props.setState(this.props.file);
    };
    public handleMouseOut = () => {
        this.props.setState(null);
    };

    public render() {
        const { size, file, href, as, mosaic } = this.props;
        let style: React.CSSProperties = {};
        const Component = href ? LinkRoot : Root;
        if (size) {
            style = {
                width: size.width,
                height: size.height,
                backgroundImage: `url(${file.thumbnailUrl})`,
            };
        }

        const content = (
            <Component
                mosaic={mosaic}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                ref={this.domRef}
                background={Boolean(size)}
                style={style}
            />
        );

        if (href) {
            return (
                <Link href={href} as={as} passHref>
                    {content}
                </Link>
            );
        }

        return content;
    }
}

export default withState(previewState)(Thumbnail);
