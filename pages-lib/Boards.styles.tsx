import styled from "@emotion/styled";
import { Mobile } from "@styles/utils";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    ${Mobile} {
        padding: ${({ theme }) => theme.spacing(0, 2)};
    }
`;
