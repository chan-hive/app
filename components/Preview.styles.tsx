import styled from "@emotion/styled";

import MediaViewer from "@components/MediaViewer";

export const Root = styled(MediaViewer)`
    margin: 0;
    padding: 0;

    position: fixed;

    background: black;

    z-index: 10000;

    pointer-events: none;
`;
