import React from "react";
import fileSize from "filesize";

import { Root } from "@components/Gallery/FileInformation.styles";

import { PostFile } from "@utils/types";

export interface FileInformationProps {
    file: PostFile;
    current: number;
    total: number;
}
export interface FileInformationStates {}

export class FileInformation extends React.Component<FileInformationProps, FileInformationStates> {
    private handleLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    private handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    public render() {
        const { file, current, total } = this.props;
        const encodedUrl = encodeURIComponent(file.url);

        return (
            <Root onClick={this.handleClick}>
                <span>
                    {current + 1} / {total}
                </span>
                <span>
                    <a href={file.url} onClick={this.handleLinkClick} download>
                        {file.name}
                        {file.extension}
                    </a>
                </span>
                {file.metadata && <span>metadata: {file.metadata}</span>}
                <span>{`${fileSize(file.size).toUpperCase()} (${file.size.toLocaleString()} Bytes)`}</span>
                <span>
                    <a
                        target="_blank"
                        href={`https://www.google.com/searchbyimage?image_url=${encodedUrl}&safe=off`}
                        rel="noreferrer"
                        onClick={this.handleLinkClick}
                    >
                        google
                    </a>
                    <a
                        target="_blank"
                        href={`https://yandex.com/images/search?rpt=imageview&url=${encodedUrl}`}
                        rel="noreferrer"
                        onClick={this.handleLinkClick}
                    >
                        yandex
                    </a>
                    <a target="_blank" href={`https://iqdb.org/?url=${encodedUrl}`} rel="noreferrer" onClick={this.handleLinkClick}>
                        iqdb
                    </a>
                    <a target="_blank" href={`https://trace.moe/?auto&url=${encodedUrl}`} rel="noreferrer" onClick={this.handleLinkClick}>
                        wait
                    </a>
                </span>
            </Root>
        );
    }
}
