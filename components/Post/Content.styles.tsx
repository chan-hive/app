import styled from "@emotion/styled";

export const Root = styled.div``;

export const Text = styled.span``;

export const Quote = styled.span`
    font-family: "Roboto Mono", monospace !important;
    color: ${({ theme }) => theme.palette.secondary.main};
`;

export const QuoteLink = styled.a`
    font-family: "Roboto Mono", monospace !important;
    text-decoration: underline;
    text-decoration-style: dashed;

    color: ${({ theme }) => theme.palette.primary.main};

    cursor: pointer;
`;
