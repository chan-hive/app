import styled from "@emotion/styled";
import { Container } from "@mui/material";
import { Desktop, Mobile } from "@styles/utils";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    ${Desktop} {
        padding: ${({ theme }) => theme.spacing(2, 0)};
    }
`;

export const WidthWrapper = styled(Container)`
    ${Mobile} {
        padding: 0;
    }
`;
