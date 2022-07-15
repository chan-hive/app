/* eslint-disable jsx-a11y/media-has-caption,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import memoizeOne from "memoize-one";
import * as _ from "lodash";

import PreventBodyScroll from "@components/UI/PreventBodyScroll";
import { FileInformation } from "@components/Gallery/FileInformation";
import GalleryOptions, { GalleryOptionsValue } from "@components/Gallery/Options";
import { withThread, WithThreadProps } from "@components/Thread/withThread";

import { Body, Container, Playlist, PlaylistContainer, PlaylistItem, Root, ThumbnailImage } from "@components/Gallery/index.styles";

import VideoHelper from "@utils/video-helper";
import { PostFile } from "@utils/types";

export interface GalleryProps extends WithThreadProps {
    hidden: boolean;
    onClose(): void;
}
export interface GalleryStates {
    currentIndex: number;
    option: GalleryOptionsValue;
}

class Gallery extends React.Component<GalleryProps, GalleryStates> {
    private thumbnailRef = this.props.files.map(() => React.createRef<HTMLButtonElement>());
    private playlistRef = React.createRef<HTMLDivElement>();
    public state: GalleryStates = {
        currentIndex: 0,
        option: {
            repeat: "repeat-one",
        },
    };

    public componentDidMount() {
        window.addEventListener("keydown", this.handleGlobalKeyDown, false);
    }
    public async componentDidUpdate(prevProps: Readonly<GalleryProps>, prevStates: Readonly<GalleryStates>) {
        if (this.props.files !== prevProps.files || (this.props.hidden !== prevProps.hidden && this.props.hidden)) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ currentIndex: 0 });
        }

        if (prevStates.currentIndex !== this.state.currentIndex) {
            this.handleIndexChanged(this.state.currentIndex);
        }
    }
    public componentWillUnmount() {
        window.addEventListener("keydown", this.handleGlobalKeyDown, false);
    }

    private handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") {
            return;
        }

        this.moveIndex(e.key === "ArrowRight" ? "forward" : "backward");
        e.preventDefault();
    };
    private handleVideoDOM = (dom?: HTMLVideoElement | null) => {
        if (!dom) {
            return;
        }

        VideoHelper.Instance.register(this.props.files[this.state.currentIndex].id, dom);
    };
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
    private handleOptionChange = (option: GalleryOptionsValue) => {
        this.setState({
            option: _.cloneDeep(option),
        });
    };
    private handleEnded = () => {
        const {
            option: { repeat },
        } = this.state;

        if (repeat !== "repeat-all") {
            return;
        }

        this.moveIndex("forward");
    };
    private handleIndexChanged = (index: number) => {
        const targetRef = this.thumbnailRef[index];
        if (!targetRef.current || !this.playlistRef.current) {
            return;
        }

        const { height: viewportHeight } = this.playlistRef.current.getBoundingClientRect();
        const { height: thumbnailHeight } = targetRef.current.getBoundingClientRect();
        const centerY = viewportHeight / 2;
        const halfHeight = thumbnailHeight / 2;

        this.playlistRef.current.scrollTo({ top: targetRef.current.offsetTop - centerY + halfHeight });

        const currentPost = this.props.posts.find(p => p.file?.id === this.props.files[index].id);
        if (!currentPost) {
            return;
        }

        this.props.scrollToElement(currentPost.id);
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

    private renderFile = (file: PostFile, index: number) => {
        const { files } = this.props;
        const { currentIndex } = this.state;
        const currentFile = files[currentIndex];

        return (
            <PlaylistItem ref={this.thumbnailRef[index]} isFocused={file === currentFile} key={file.id} onClick={this.handlePlaylistItemClick(index)}>
                <ThumbnailImage src={file.thumbnailUrl} alt={`${file.name}${file.extension}`} />
            </PlaylistItem>
        );
    };
    public render() {
        const { hidden, files } = this.props;
        const { currentIndex, option } = this.state;
        const currentFile = files[currentIndex];

        if (hidden) {
            return null;
        }

        return (
            <Root>
                <PreventBodyScroll />
                <Container>
                    <Body onClick={this.handleBackgroundClick}>
                        {currentFile.isVideo && !hidden && (
                            <video
                                ref={this.handleVideoDOM}
                                onClick={this.handleMediaClick}
                                autoPlay
                                controls
                                onEnded={this.handleEnded}
                                loop={option.repeat === "repeat-one"}
                                src={currentFile.url}
                            />
                        )}
                        {!currentFile.isVideo && <img onClick={this.handleMediaClick} src={currentFile.url} alt={currentFile.name + currentFile.extension} />}
                        <FileInformation total={files.length} current={currentIndex} file={currentFile} />
                        <GalleryOptions onChange={this.handleOptionChange} value={this.state.option} />
                    </Body>
                    <Playlist ref={this.playlistRef}>
                        <PlaylistContainer>{files.map(this.renderFile)}</PlaylistContainer>
                    </Playlist>
                </Container>
            </Root>
        );
    }
}

export default withThread(Gallery);
