import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(1.5)};
`;

export const Title = styled.span`
    margin: 0 0 ${({ theme }) => theme.spacing(1)};
    padding: 0;

    display: block;

    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &:last-of-type {
        margin-bottom: 0 !important;
    }
`;

export const Content = styled.span`
    margin: 0;
    padding: 0;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-size: 15px;

    overflow: hidden;
    -webkit-line-clamp: 3;

    .quote {
        color: #3d9801;
    }
`;

export const Thumbnail = styled.div`
    margin: 0 0 ${({ theme }) => theme.spacing(2)};
    padding: 0;

    background-size: cover;
    background-position: center;
`;

export const ThumbnailWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
