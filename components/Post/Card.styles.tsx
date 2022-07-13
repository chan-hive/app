import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0 0 ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(2)};
    border: 1px solid rgba(0, 0, 0, 0.12);

    background: white;
`;

export const Metadata = styled.div`
    margin: 0 0 ${({ theme }) => theme.spacing(1.5)};

    font-size: 0.857143rem;

    > a,
    > span,
    > time,
    > button {
        &:not(:last-child) {
            margin-right: ${({ theme }) => theme.spacing(1)};
        }
    }

    > a {
        color: inherit;
    }

    button {
        margin: 0;
        padding: 0;
        border: 0;

        font-size: 0.857143rem;
        font-family: "Roboto Mono", monospace !important;
        text-decoration: underline;

        color: ${({ theme }) => theme.palette.primary.main};
        background: transparent;

        cursor: pointer;
    }
`;

export const Formatted = styled.span<{ color?: string; bold?: boolean }>`
    color: ${({ color }) => color};
    font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

export const Content = styled.div<{ shouldWrap?: boolean }>`
    display: flex;
    flex-wrap: ${({ shouldWrap }) => (shouldWrap ? "wrap" : "nowrap")};

    font-size: 0.857143rem;
`;

export const Video = styled.video`
    max-width: 100%;

    display: block;

    cursor: pointer;

    &:not(:last-child) {
        margin-right: ${({ theme }) => theme.spacing(1.5)};
        margin-bottom: ${({ theme }) => theme.spacing(1.5)};
    }
`;

export const Image = styled.img`
    max-width: 100%;

    display: block;

    cursor: pointer;

    &:not(:last-child) {
        margin-right: ${({ theme }) => theme.spacing(1.5)};
        margin-bottom: ${({ theme }) => theme.spacing(1.5)};
    }
`;

export const ThumbnailViewer = styled.div`
    width: 100%;
    max-width: 125px;
    max-height: 125px;

    margin-right: ${({ theme }) => theme.spacing(1.5)};

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    cursor: pointer;

    > img {
        max-width: 100%;
    }
`;
