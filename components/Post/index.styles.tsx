import styled from "@emotion/styled";
import { Card as MuiCard } from "@mui/material";

export const Card = styled(MuiCard)`
    margin: 0 0 ${({ theme }) => theme.spacing(1)};
`;

export const Root = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};
`;

export const Body = styled.div`
    display: flex;
`;

export const ThumbnailWrapper = styled.div`
    margin-right: ${({ theme }) => theme.spacing(2)};
`;

export const ModalRoot = styled.div`
    width: 800px;
    margin: 0;
    padding: 0;

    position: fixed;
    top: 0;

    pointer-events: none;
`;