import React from "react";

import { withState, WithStateProps } from "@components/HOC/withState";

import { previewState } from "@states/preview";

import { Root } from "@components/Preview.styles";

import { FileInformation, RecoilStateValue } from "@utils/types";
import { VideoHelper } from "@utils/video-helper";
import { isTouchDevice } from "@utils/isTouchDevice";

export interface PreviewProps {}
export interface PreviewStates {}

class Preview extends React.Component<PreviewProps & WithStateProps<RecoilStateValue<typeof previewState>>, PreviewStates> {
    private isUnmounted = false;
    private mouseX: number = 0;
    private mouseY: number = 0;
    private clientWidth: number = 0;
    private clientHeight: number = 0;
    private domElement: HTMLImageElement | HTMLVideoElement | null = null;

    public componentDidMount() {
        window.requestAnimationFrame(this.handleAnimationFrame);
        window.addEventListener("mousemove", this.handleMouseMove, false);

        this.clientWidth = document.documentElement.clientWidth;
        this.clientHeight = document.documentElement.clientHeight;
    }
    public componentWillUnmount() {
        this.isUnmounted = true;
        VideoHelper.instance.removeAllElement();
    }

    private updateDOMPosition = (dom: HTMLImageElement | HTMLVideoElement, file: FileInformation) => {
        const height = dom.offsetHeight + 16;
        const width = dom.offsetWidth;
        const top = !file.extension.endsWith("webm")
            ? Math.max(0, (this.mouseY * (this.clientHeight - height)) / this.clientHeight)
            : Math.max(0, Math.min(this.clientHeight - height, this.mouseY - 120));

        const threshold = this.clientWidth / 2;
        let marginX = (this.mouseX <= threshold ? this.mouseX : this.clientWidth - this.mouseX) + 45;
        marginX = Math.min(marginX, this.clientWidth - width);

        const { style } = dom;
        style.top = `${top.toFixed(2)}px`;
        if (this.mouseX <= threshold) {
            style.left = `${marginX}px`;
            style.right = "";
        } else {
            style.left = "";
            style.right = `${marginX}px`;
        }
    };
    private getDOMStyle = (file: FileInformation): React.CSSProperties => {
        const maxWidth = document.documentElement.clientWidth;
        const maxHeight = document.documentElement.clientHeight - 16;
        const scale = Math.min(1, maxWidth / file.width, maxHeight / file.height);

        return {
            maxWidth: file.width * scale,
            maxHeight: file.height * scale,
        };
    };

    private handleAnimationFrame = () => {
        if (this.isUnmounted) {
            return;
        }

        window.requestAnimationFrame(this.handleAnimationFrame);
        if (!this.domElement || !this.props.state) {
            return;
        }

        this.updateDOMPosition(this.domElement, this.props.state);
    };
    public handleMouseMove = (e: MouseEvent) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    };
    public handleMediaRef = (element: HTMLImageElement | HTMLVideoElement | null) => {
        if (this.props.state) {
            if (element instanceof HTMLVideoElement) {
                VideoHelper.instance.addElement(this.props.state, element);
            } else if (!element && this.domElement instanceof HTMLVideoElement) {
                VideoHelper.instance.removeElement(this.props.state, this.domElement);
            }
        } else if (!element && this.domElement instanceof HTMLVideoElement) {
            VideoHelper.instance.removeDOMElement(this.domElement);
        }

        this.domElement = element;
    };

    public render() {
        const { state } = this.props;
        if (!state || isTouchDevice()) {
            return null;
        }

        return <Root innerRef={this.handleMediaRef} file={state} loop style={this.getDOMStyle(state)} />;
    }
}

export default withState(previewState)(Preview);
