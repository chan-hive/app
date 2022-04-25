import React from "react";

import { createTheme, styled, ThemeProvider, Tooltip as MuiTooltip, tooltipClasses, TooltipProps } from "@mui/material";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import RepeatAllIcon from "@mui/icons-material/Repeat";

import { Root, IconButton } from "@components/Gallery/Options.styles";

export interface GalleryOptionsValue {
    repeat: "repeat-one" | "repeat-all";
}

export interface GalleryOptionsProps {
    value: GalleryOptionsValue;
    onChange(option: GalleryOptionsValue): void;
}
export interface GalleryOptionsStates {}

const galleryOptionsTheme = createTheme({
    typography: {
        fontSize: 16,
    },
});

const Tooltip = styled(({ className, ...props }: TooltipProps) => <MuiTooltip {...props} classes={{ popper: className }} />)(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
}));

export default class GalleryOptions extends React.Component<GalleryOptionsProps, GalleryOptionsStates> {
    private handleRepeatClick = (e: React.MouseEvent) => {
        const { value, onChange } = this.props;

        switch (value.repeat) {
            case "repeat-one":
            case "repeat-all":
                onChange({
                    ...value,
                    repeat: value.repeat === "repeat-one" ? "repeat-all" : "repeat-one",
                });
                break;

            default:
                break;
        }

        e.stopPropagation();
    };

    public render() {
        const { value } = this.props;
        const RepeatIcon = value.repeat === "repeat-one" ? RepeatOneIcon : RepeatAllIcon;
        const RepeatButtonText = value.repeat === "repeat-one" ? "Repeat one" : "Repeat all";

        return (
            <ThemeProvider theme={galleryOptionsTheme}>
                <Root>
                    <Tooltip title={RepeatButtonText}>
                        <IconButton onClick={this.handleRepeatClick}>
                            <RepeatIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Root>
            </ThemeProvider>
        );
    }
}
