import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { DRAWER_WIDTH } from "@constants/layout";
import { NO_SCROLL_CLASSNAME } from "@components/UI/PreventBodyScroll";

export const GlobalStyle = css`
    body,
    html {
        margin: 0;
        padding: 0;

        background-color: #f2f3f9;
    }

    .infinite-scroll-component {
        overflow: visible !important;
    }

    .${NO_SCROLL_CLASSNAME} {
        overflow-y: hidden;
    }
`;

export const Root = styled.div<{ withoutPadding?: boolean }>`
    margin: 0 auto;
    padding: ${({ theme, withoutPadding }) => (withoutPadding ? 0 : theme.spacing(2, 0))};
`;

export const Main = styled.main`
    ${({ theme }) => theme.breakpoints.up("xl")} {
        padding-left: ${({ theme }) => theme.spacing(DRAWER_WIDTH / 8 + 2)};
        padding-right: ${({ theme }) => theme.spacing(2)};
    }
`;
