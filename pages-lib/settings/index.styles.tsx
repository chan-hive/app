import styled from "@emotion/styled";
import { Paper } from "@mui/material";

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

export const Section = styled(Paper)`
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 4px;

    background: white;

    & + & {
        margin-top: ${({ theme }) => theme.spacing(1)};
    }
`;
