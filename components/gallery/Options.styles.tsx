import styled from "@emotion/styled";
import { IconButton as MuiIconButton } from "@mui/material";

export const Root = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(1)};

    position: absolute;
    top: 0;
    right: 0;
`;

export const IconButton = styled(MuiIconButton)`
    font-size: 24px;

    color: white;

    opacity: 0.5;

    transition: opacity 0.15s ease;

    &:hover {
        opacity: 1;
    }
`;
