import styled from "@emotion/styled";
import Floating from "@components/Floating";
import MediaThumbnail from "@components/UI/MediaThumbnail";
import MediaViewer from "@components/UI/MediaViewer";

export const Root = styled.div<{ highlighted: boolean }>`
    margin: 0 0 ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(2)};
    border: 1px solid ${({ theme, highlighted }) => (highlighted ? theme.palette.primary.main : "rgba(0, 0, 0, 0.12)")};

    background: white;
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
`;

export const ThumbnailViewer = styled(MediaThumbnail)`
    max-width: 125px;

    margin-right: ${({ theme }) => theme.spacing(1.5)};

    cursor: pointer;

    > img {
        max-width: 100%;
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
