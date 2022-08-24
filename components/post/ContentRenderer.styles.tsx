import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    p {
        margin: 0;

        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 0.857143rem;
        line-height: 1.5;
        letter-spacing: 0.00938em;
    }

    ${({ theme }) => theme.breakpoints.down("sm")} {
        p {
            word-break: break-word;
            font-size: 0.8rem;
        }
    }
`;

export const Item = styled.span<{ monospaced?: boolean; green?: boolean }>`
    color: ${({ green }) => (green ? "rgb(0, 101, 0)" : "inherit")};
    font-family: ${({ monospaced }) => (monospaced ? "'Consolas', monospace" : "inherit")};
`;

export const Anchor = styled.a<{ green?: boolean; referred?: boolean }>`
    color: rgb(180, 51, 211);
    font-family: "Roboto Mono", monospace !important;

    opacity: ${({ referred }) => (referred ? 0.5 : 1)};
`;
