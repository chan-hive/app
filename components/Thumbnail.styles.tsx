import styled from "@emotion/styled";
import { css } from "@emotion/react";

const generateBaseStyles = ({ background, mosaic }: { background: boolean; mosaic?: boolean }) =>
    css`
        margin: 0;
        padding: 0;

        display: block;

        ${background
            ? css`
                  background-size: cover;
                  background-position: center;
              `
            : ""}

        ${background && mosaic
            ? css`
                  transform: scale(1.1);
                  filter: blur(12px) brightness(0.6);
              `
            : ""}
    `;

export const Root = styled.div<{ background: boolean; mosaic?: boolean }>`
    ${({ background, mosaic }) => generateBaseStyles({ background, mosaic })}
`;

export const LinkRoot = styled.a<{ background: boolean; mosaic?: boolean }>`
    ${({ background, mosaic }) => generateBaseStyles({ background, mosaic })}
`;
