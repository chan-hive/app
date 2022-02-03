import styled from "@emotion/styled";
import { Theme, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { Mobile } from "@styles/utils";

const generateCommonStyles = (theme: Theme) => css`
    display: block;

    &:not(:last-child) {
        margin-right: ${theme.spacing(1)};
    }

    ${Mobile({ theme })} {
        display: inline !important;
        font-size: 0.75rem;
        color: rgba(0, 0, 0, 0.65);

        &:not(:last-child) {
            margin-right: ${theme.spacing(0.5)};
        }
    }
`;

export const Root = styled.div`
    margin: 0 0 ${({ theme }) => theme.spacing(1)};
    padding: 0;

    display: flex;

    ${Mobile} {
        display: block;
    }
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

export const FileName = styled(Typography)<{ component?: "a"; href?: string; target?: "_blank" }>`
    ${({ theme }) => generateCommonStyles(theme)}

    text-decoration: underline;
    color: rgba(0, 0, 0, 0.5);
`;

export const Span = styled(Typography)`
    ${({ theme }) => generateCommonStyles(theme)}
`;

export const Row = styled.div`
    display: flex;

    line-height: 0;

    &:last-child {
        display: block;
    }
`;
