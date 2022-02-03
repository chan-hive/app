import styled from "@emotion/styled";
import LogoComponent from "@res/logo.svg";

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

export const Logo = styled(LogoComponent)`
    width: 32px;

    margin: 0 ${({ theme }) => theme.spacing(2.5)} 0 0;

    flex: 0 0 32px;

    display: block;
`;
