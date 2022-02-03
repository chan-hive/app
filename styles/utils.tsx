import React from "react";
import { Hidden, Theme } from "@mui/material";

export const Mobile = ({ theme }: { theme: Theme }) => theme.breakpoints.down("md");
export const Desktop = ({ theme }: { theme: Theme }) => theme.breakpoints.up("md");

export const MobileOnly = (props: React.ComponentProps<typeof Hidden>) => (
    <Hidden {...props} mdUp>
        {props.children}
    </Hidden>
);
export const DesktopOnly = (props: React.ComponentProps<typeof Hidden>) => (
    <Hidden {...props} mdDown>
        {props.children}
    </Hidden>
);
