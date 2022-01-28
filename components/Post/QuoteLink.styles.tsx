import styled from "@emotion/styled";

export const Root = styled.a`
    font-family: "Roboto Mono", monospace !important;
    text-decoration: underline;
    text-decoration-style: dashed;

    color: ${({ theme }) => theme.palette.primary.main};

    cursor: pointer;
`;
