import styled from "@emotion/styled";

export const Root = styled.div`
    position: absolute;
    right: ${({ theme }) => theme.spacing(1)};
    bottom: ${({ theme }) => theme.spacing(1)};

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    font-size: 14px;

    > span {
        padding: 4px 6px;
        border-radius: 4px;

        display: flex;

        background: rgba(0, 0, 0, 0.75);

        &:not(:last-child) {
            margin-bottom: ${({ theme }) => theme.spacing(0.5)};
        }

        > a {
            display: block;

            text-decoration: none;
            color: inherit;

            &:not(:last-child) {
                margin-right: ${({ theme }) => theme.spacing(0.5)};
            }

            &:hover {
                color: ${({ theme }) => theme.palette.primary.main};
            }
        }
    }
`;
