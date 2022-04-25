import styled from "@emotion/styled";
import { ButtonBase, Card as MuiCard } from "@mui/material";
import { Mobile } from "@styles/utils";

export const BodyWrapper = styled.div`
    ${Mobile} {
        max-width: calc(100% - ${({ theme }) => theme.spacing(8)});

        padding: ${({ theme }) => theme.spacing(1)};

        flex: 1 1 auto;
        box-sizing: border-box;
    }
`;

export const Card = styled(MuiCard)`
    margin: 0 0 ${({ theme }) => theme.spacing(1)};

    ${Mobile} {
        margin: 0;
        border: 0;
        border-radius: 0;
    }

    &:not(:first-of-type) {
        ${BodyWrapper} {
            ${Mobile} {
                border-top: 1px solid #eaeef3;
            }
        }
    }
`;

export const Root = styled.div`
    padding: ${({ theme }) => theme.spacing(2)};

    ${Mobile} {
        margin: 0;
        padding: 0;

        display: flex;
    }
`;

export const Body = styled.div<{ expanded: boolean }>`
    display: ${({ expanded }) => (expanded ? "block" : "flex")};

    ${Mobile} {
        display: block !important;
    }
`;

export const ThumbnailWrapper = styled.div<{ expanded: boolean }>`
    max-width: 100%;

    margin-right: ${({ theme, expanded }) => theme.spacing(expanded ? 0 : 2)};

    &:not(:last-child) {
        margin-bottom: ${({ theme, expanded }) => theme.spacing(expanded ? 2 : 0)};
    }
`;

export const ModalRoot = styled.div`
    min-width: 500px;
    margin: 0;
    padding: 0;

    position: fixed;
    top: 0;
    left: 0;

    pointer-events: none;

    ${Card} {
        margin-bottom: 0;
    }
`;

export const ThumbnailButton = styled(ButtonBase)`
    width: ${({ theme }) => theme.spacing(8)};
    height: ${({ theme }) => theme.spacing(8)};

    padding: 0;
    margin: 0;

    flex: 0 0 ${({ theme }) => theme.spacing(8)};

    background-color: black;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    color: ${({ theme }) => theme.palette.primary.main};
`;
