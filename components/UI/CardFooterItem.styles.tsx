import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const Item = styled.div`
    display: flex;
    align-items: center;

    &:not(:last-child) {
        margin-right: ${({ theme }) => theme.spacing(1.5)};
    }
`;

export const FooterItemValue = styled(Typography)`
    margin-left: ${({ theme }) => theme.spacing(0.5)};

    color: #9b9b9b;

    font-size: 12px;
    line-height: 1;

    user-select: none;
`;
