/* eslint-disable jsx-a11y/media-has-caption,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import memoizeOne from "memoize-one";

import PreventBodyScroll from "@components/UI/PreventBodyScroll";

import { Body, Container, Playlist, PlaylistContainer, PlaylistItem, Root, Thumbnail, ThumbnailImage } from "@components/Gallery/index.styles";

import { ThumbnailHelper } from "@utils/thumbnail-helper";
import { VideoHelper } from "@utils/video-helper";
import { PostFile } from "@utils/types";

export interface GalleryProps {
    hidden: boolean;
    files: PostFile[];
    onClose(): void;
}
export interface GalleryStates {
    currentIndex: number;
}

export default class Gallery extends React.Component<GalleryProps, GalleryStates> {
    public state: GalleryStates = {
        currentIndex: 0,
    };

    public componentDidMount() {
        if (!this.props.hidden) {
            this.configureEventListeners();
        }
    }
    public componentDidUpdate(prevProps: Readonly<GalleryProps>) {
        if (this.props.files !== prevProps.files) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ currentIndex: 0 });
        }

        if (this.props.hidden !== prevProps.hidden) {
            this.configureEventListeners(this.props.hidden);
        }
    }
    public componentWillUnmount() {
        this.configureEventListeners(true);
    }

    private handlePlaylistItemClick = memoizeOne((index: number) => {
        return () => {
            this.setState({
                currentIndex: index,
            });
        };
    });
    private handleMediaClick = (e: React.MouseEvent<HTMLElement>) => {
        this.setState((prevStates: GalleryStates) => ({
            currentIndex: prevStates.currentIndex + 1,
        }));

        e.stopPropagation();
    };
    private handleBackgroundClick = () => {
        this.props.onClose();
    };
    private handleVideoDOM = (dom?: HTMLVideoElement | null) => {
        if (!dom) {
            return;
        }

        ThumbnailHelper.instance.subscribe(dom, this.props.files[this.state.currentIndex]);
        VideoHelper.instance.addElement(this.props.files[this.state.currentIndex], dom);
    };
    private handleGlobalKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {
            case "ArrowRight":
                this.moveIndex("forward");
                break;

            case "ArrowLeft":
                this.moveIndex("backward");
                break;

            default:
                break;
        }
    };

    private moveIndex = (mode: "forward" | "backward", amount = 1) => {
        this.setState((prevStates: GalleryStates) => {
            let nextIndex = prevStates.currentIndex + (mode === "backward" ? -amount : amount);
            if (nextIndex < 0) {
                nextIndex = this.props.files.length - 1;
            }

            if (nextIndex >= this.props.files.length) {
                nextIndex = 0;
            }

            return {
                currentIndex: nextIndex,
            };
        });
    };
    private configureEventListeners = (uninstall: boolean = false) => {
        if (uninstall) {
            window.removeEventListener("keydown", this.handleGlobalKeyDown, false);
        } else {
            window.addEventListener("keydown", this.handleGlobalKeyDown, false);
        }
    };

    private renderFile = (file: PostFile, index: number) => {
        const { files } = this.props;
        const { currentIndex } = this.state;
        const currentFile = files[currentIndex];

        return (
            <PlaylistItem isFocused={file === currentFile} key={file.id} onClick={this.handlePlaylistItemClick(index)}>
                {file.isVideo && <Thumbnail style={{ backgroundImage: `url(${file.thumbnailUrl})` }} />}
                {!file.isVideo && <ThumbnailImage src={file.thumbnailUrl} alt={`${file.name}${file.extension}`} />}
            </PlaylistItem>
        );
    };
    public render() {
        const { hidden, files } = this.props;
        const { currentIndex } = this.state;
        const currentFile = files[currentIndex];

        if (hidden) {
            return null;
        }

        return (
            <Root>
                <PreventBodyScroll />
                <Container>
                    <Body onClick={this.handleBackgroundClick}>
                        {currentFile.isVideo && (
                            <video ref={this.handleVideoDOM} onClick={this.handleMediaClick} autoPlay controls loop src={currentFile.url} />
                        )}
                        {!currentFile.isVideo && <img onClick={this.handleMediaClick} src={currentFile.url} alt={currentFile.name + currentFile.extension} />}
                    </Body>
                    <Playlist>
                        <PlaylistContainer>{files.map(this.renderFile)}</PlaylistContainer>
                    </Playlist>
                </Container>
            </Root>
        );
    }
}
