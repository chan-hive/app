import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { css } from "@emotion/react";

export const Body = styled.a`
    padding: ${({ theme }) => theme.spacing(1.75, 1.75, 2.25)};

    text-decoration: none;

    flex: 1 1 auto;
`;

export const ThumbnailWrapper = styled.a`
    position: relative;

    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    aspect-ratio: 276 / 145;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

export const Title = styled(Typography)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: #393a40;
`;

export const Content = styled(Typography)`
    padding-top: ${({ theme }) => theme.spacing(0.75)};

    word-break: keep-all;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;

    color: #717278;

    transition: color 0.15s ease;

    &:first-of-type {
        padding-top: 0;
    }
`;

export const Footer = styled.div`
    padding: ${({ theme }) => theme.spacing(1.75)};
    border-top: 1px solid #f2f3f9;

    display: flex;

    svg {
        width: ${({ theme }) => theme.spacing(2)};
        height: ${({ theme }) => theme.spacing(2)};

        display: block;

        color: #9b9b9b;
    }
`;

export const Metadata = styled.div`
    padding: ${({ theme }) => theme.spacing(0, 1.75, 1.25)};
`;

export const Root = styled.div<{ skeleton?: boolean }>`
    height: 100%;

    margin: 0;
    border-radius: 6px;

    overflow: hidden;

    display: flex;
    flex-direction: column;

    box-shadow: rgb(24 25 31 / 5%) 0 6px 25px;
    background: white;

    transition: all 150ms;

    ${({ skeleton }) =>
        !skeleton
            ? css`
                  &:hover {
                      box-shadow: rgb(24 25 31 / 15%) 0 6px 35px;
                      transform: translateY(-4px);

                      ${Content} {
                          color: #44454b;
                      }
                  }
              `
            : ""}
`;
