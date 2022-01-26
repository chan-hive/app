import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const GlobalStyle = css`
    body,
    html {
        margin: 0;
        padding: 0;

        background-color: #f2f3f9;
    }
`;

export const Root = styled.div`
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing(2, 0)};
`;
