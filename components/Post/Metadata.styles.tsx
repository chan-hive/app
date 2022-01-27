import styled from "@emotion/styled";
import { Theme, Typography } from "@mui/material";
import { css } from "@emotion/react";

const generateCommonStyles = (theme: Theme) => css`
    display: block;

    line-height: 1;

    &:not(:last-child) {
        margin-right: ${theme.spacing(1)};
    }
`;

export const Root = styled.div`
    margin: 0 0 ${({ theme }) => theme.spacing(1)};
    padding: 0;

    display: flex;
`;

export const Title = styled(Typography)`
    ${({ theme }) => generateCommonStyles(theme)}

    color: ${({ theme }) => theme.palette.primary.main};
`;

export const Author = styled(Title)`
    ${({ theme }) => generateCommonStyles(theme)}

    font-weight: bold;

    color: ${({ theme }) => theme.palette.secondary.main};
`;

export const Date = styled(Typography)<{ component: "time" }>`
    ${({ theme }) => generateCommonStyles(theme)}
`;

export const FileName = styled(Typography)<{ component: "a"; href: string; target: "_blank" }>`
    ${({ theme }) => generateCommonStyles(theme)}

    color: rgba(0, 0, 0, 0.5);
`;
