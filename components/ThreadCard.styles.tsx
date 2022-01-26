import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const Body = styled.div`
    padding: ${({ theme }) => theme.spacing(1.75, 1.75, 2.25)};

    flex: 1 1 auto;
`;

export const Thumbnail = styled.div`
    margin: 0;
    padding: 0;

    background-size: cover;
    background-position: center;

    transform: scale(1.1);
    filter: blur(12px) brightness(0.6);
`;

export const ThumbnailWrapper = styled.div`
    position: relative;

    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;
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

    &:first-child {
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

export const BoardName = styled(Typography)`
    color: #a0a2a8;
`;

export const Metadata = styled.div`
    padding: ${({ theme }) => theme.spacing(0, 1.75, 1.25)};
`;

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

export const Root = styled.div`
    height: 100%;

    margin: 0;
    border-radius: 6px;

    overflow: hidden;

    display: flex;
    flex-direction: column;

    box-shadow: rgb(24 25 31 / 5%) 0 6px 25px;
    background: white;

    transition: all 150ms;

    &:hover {
        box-shadow: rgb(24 25 31 / 15%) 0 6px 35px;
        transform: translateY(-4px);

        ${Content} {
            color: #44454b;
        }
    }
`;
