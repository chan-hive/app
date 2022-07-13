/* eslint-disable react/no-danger */
import React from "react";
import Link from "next/link";

import { Skeleton } from "@mui/material";

import { Body, Content, Footer, Metadata, Root, ThumbnailWrapper, Title } from "@components/UI/Card.styles";

import { FileInformation } from "@utils/types";

export interface CardProps {
    title?: string | null | undefined;
    content?: string | null | undefined;
    thumbnail?: {
        file?: FileInformation | null | undefined;
        mosaic?: boolean;
    };
    renderFooter?: () => React.ReactNode;
    renderMetadata?: () => React.ReactNode;
    href: string;
    as?: string;
    skeleton?: false;
    contentComponent?: React.ComponentType;
}

export interface CardSkeletonProps {
    skeleton: true;
    renderFooter?: () => React.ReactNode;
    renderMetadata?: () => React.ReactNode;
}

export interface CardStates {}

export default class Card extends React.Component<CardProps | CardSkeletonProps, CardStates> {
    private renderSkeleton = ({ renderFooter, renderMetadata }: CardSkeletonProps) => {
        return (
            <Root skeleton>
                <ThumbnailWrapper>
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={145} />
                </ThumbnailWrapper>
                <Body>
                    <Title variant="h6">
                        <Skeleton animation="wave" />
                    </Title>
                    <Content variant="body1">
                        <Skeleton animation="wave" />
                        <Skeleton width="65%" animation="wave" />
                    </Content>
                </Body>
                {renderMetadata && <Metadata>{renderMetadata()}</Metadata>}
                {renderFooter && <Footer>{renderFooter()}</Footer>}
            </Root>
        );
    };

    public render() {
        if (this.props.skeleton === true) {
            return this.renderSkeleton(this.props);
        }

        const { title, content, renderFooter, renderMetadata, href, as, contentComponent, thumbnail } = this.props;
        const ContentComponent = contentComponent || Content;

        return (
            <Root>
                {thumbnail?.file && (
                    <Link href={href} as={as} passHref>
                        <ThumbnailWrapper style={{ backgroundImage: `url(${thumbnail.file.thumbnailUrl})` }} />
                    </Link>
                )}
                <Link href={href} as={as} passHref>
                    <Body>
                        <Title variant="h6">{title}</Title>
                        <ContentComponent variant="body1">
                            <span dangerouslySetInnerHTML={{ __html: content || "" }} />
                        </ContentComponent>
                    </Body>
                </Link>
                {renderMetadata && <Metadata>{renderMetadata()}</Metadata>}
                {renderFooter && <Footer>{renderFooter()}</Footer>}
            </Root>
        );
    }
}
