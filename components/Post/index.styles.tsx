import styled from "@emotion/styled";
import { Card as MuiCard } from "@mui/material";

export const Card = styled(MuiCard)`
    margin: 0 0 ${({ theme }) => theme.spacing(1)};
`;

export const Root = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
`;

export const Body = styled.div<{ expanded: boolean }>`
    display: ${({ expanded }) => (expanded ? "block" : "flex")};
`;

export const ThumbnailWrapper = styled.div<{ expanded: boolean }>`
    max-width: 100%;

    margin-right: ${({ theme, expanded }) => theme.spacing(expanded ? 0 : 2)};

    &:not(:last-child) {
        margin-bottom: ${({ theme, expanded }) => theme.spacing(expanded ? 2 : 0)};
    }
`;

export const ModalRoot = styled.div`
    width: 800px;
    margin: 0;
    padding: 0;

    position: fixed;
    top: 0;

    pointer-events: none;
`;
