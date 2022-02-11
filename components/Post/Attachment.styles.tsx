import styled from "@emotion/styled";
import MediaViewer from "@components/MediaViewer";

export const Root = styled.div`
    max-width: 100%;

    margin: 0;
    padding: 0;

    cursor: pointer;
`;

export const ThumbnailWrapper = styled.div<{ isLoading: boolean }>`
    opacity: ${({ isLoading }) => (isLoading ? 0.5 : 1)};
`;

export const Media = styled(MediaViewer)`
    max-width: 100%;
    height: auto !important;

    display: block;
`;
