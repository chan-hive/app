import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
import React from "react";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 10000;

    color: white;
    background: rgba(0, 0, 0, 0.75);
`;

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: stretch;
`;

export const Playlist = styled.div`
    padding: 0 ${({ theme }) => theme.spacing(1)};

    overflow-y: auto;

    background: rgba(0, 0, 0, 0.5);
`;

export const PlaylistContainer = styled.div`
    padding: ${({ theme }) => theme.spacing(1)} 0;

    display: flex;
    flex-direction: column;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PlaylistItem = styled(({ isFocused, ...rest }: React.ComponentProps<typeof ButtonBase> & { isFocused: boolean }) => <ButtonBase {...rest} />)<
    React.ComponentProps<typeof ButtonBase> & { isFocused: boolean }
>`
    position: relative;

    &:not(:last-of-type) {
        margin-bottom: ${({ theme }) => theme.spacing(1)};
    }

    &:before {
        content: "";

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        box-shadow: ${({ isFocused, theme }) => (isFocused ? `0 0 0 2px ${theme.palette.primary.main} inset` : "none")};
    }
`;

export const Thumbnail = styled.div`
    width: 125px;
    height: 70px;

    background-size: cover;
    background-position: center center;
`;

export const ThumbnailImage = styled.img`
    max-width: 100%;

    display: block;
`;

export const Body = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;

    > video,
    > img {
        max-width: 100%;

        display: block;

        cursor: pointer;
    }
`;
