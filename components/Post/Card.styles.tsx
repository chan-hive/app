import { ButtonBase } from "@mui/material";
import styled from "@emotion/styled";
import Floating from "@components/Floating";
import MediaThumbnail from "@components/UI/MediaThumbnail";
import MediaViewer from "@components/UI/MediaViewer";

export const Root = styled.div<{ highlighted: boolean }>`
    margin: 0 0 ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(2)};
    border: 1px solid ${({ theme, highlighted }) => (highlighted ? theme.palette.primary.main : "rgba(0, 0, 0, 0.12)")};

    background: white;

    ${({ theme }) => theme.breakpoints.down("sm")} {
        margin-bottom: 0;
        border-bottom: 0;
        border-left: 0;
        border-right: 0;
        padding: ${({ theme }) => theme.spacing(0)};

        &:first-of-type {
            border-top: 0;
        }
    }
`;

export const MobileRoot = styled.div`
    margin: 0;
    padding: 0;

    display: flex;
`;

export const Metadata = styled.div`
    margin: 0 0 ${({ theme }) => theme.spacing(1.5)};

    display: flex;
    flex-wrap: wrap;

    font-size: 0.857143rem;
    font-family: "Roboto Mono", monospace !important;

    > a,
    > span,
    > time,
    > button {
        &:not(:last-child) {
            margin-right: ${({ theme }) => theme.spacing(1)};
        }
    }

    > time {
        color: rgba(0, 0, 0, 0.65);
    }

    > a {
        color: inherit;
    }

    &:last-of-type {
        margin-bottom: 0;
    }

    ${({ theme }) => theme.breakpoints.down("sm")} {
        margin: 0 0 ${({ theme }) => theme.spacing(0.5)};
        font-size: 0.8rem;
    }
`;

export const Reply = styled.a<{ referred?: boolean }>`
    margin: 0;
    padding: 0;
    border: 0;

    font-size: 0.857143rem;
    text-decoration: underline;

    display: block;

    color: ${({ theme }) => theme.palette.primary.main} !important;
    background: transparent;

    cursor: pointer;

    opacity: ${({ referred }) => (referred ? 0.5 : 1)};

    ${({ theme }) => theme.breakpoints.down("sm")} {
        display: none;
    }
`;

export const Attached = styled.a`
    color: rgba(0, 0, 0, 0.65) !important;
`;

export const Formatted = styled.span<{ color?: string; bold?: boolean; monospaced?: boolean }>`
    color: ${({ color }) => color};
    font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
    font-family: ${({ monospaced }) => (monospaced ? '"Roboto Mono", monospace !important' : "inherit")};
`;

export const Content = styled.div<{ shouldWrap?: boolean }>`
    display: flex;
    flex-wrap: ${({ shouldWrap }) => (shouldWrap ? "wrap" : "nowrap")};
    align-items: flex-start;

    font-size: 0.857143rem;

    ${({ theme }) => theme.breakpoints.down("sm")} {
        font-size: 0.8rem;
    }
`;

export const ThumbnailViewer = styled(MediaThumbnail)`
    max-width: 125px;

    margin-right: ${({ theme }) => theme.spacing(1.5)};

    cursor: pointer;

    > img {
        width: 100%;

        display: block;
    }
`;

export const Media = styled(MediaViewer)`
    max-width: 100%;

    display: block;

    cursor: pointer;

    &:not(:last-child) {
        margin-right: ${({ theme }) => theme.spacing(1.5)};
        margin-bottom: ${({ theme }) => theme.spacing(1.5)};
    }
`;

export const PostFloating = styled(Floating)`
    width: 800px;
`;

export const ReferredCards = styled.div``;

export const MobileThumbnail = styled(ButtonBase)`
    width: 64px;
    height: 64px;

    display: block;
    flex: 0 0 64px;

    color: white;
    background-color: black;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
`;

export const MobileContent = styled.div`
    padding: ${({ theme }) => theme.spacing(1)};

    flex: 1 1 auto;
`;
