import React from "react";
import Link from "next/link";

import { List, ListItemButton, ListItem, Typography, ListItemText } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { WidthWrapper } from "@routes/Thread.styles";
import { Root, Section } from "@routes/settings/index.styles";

export interface SettingsRouteProps {}
export interface SettingsRouteStates {}

export default class SettingsRoute extends React.Component<SettingsRouteProps, SettingsRouteStates> {
    public render() {
        return (
            <WidthWrapper maxWidth="md">
                <Root>
                    <Typography variant="h5" gutterBottom>
                        Settings
                    </Typography>
                    <Section elevation={0}>
                        <List disablePadding>
                            <ListItem disablePadding>
                                <Link passHref href="/settings/monitor">
                                    <ListItemButton component="a" disableRipple>
                                        <ListItemText
                                            primary="Monitor"
                                            secondary="You can configure the behavior about how Chanhive server crawls from 4chan"
                                        />
                                        <ChevronRightIcon />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                    </Section>
                </Root>
            </WidthWrapper>
        );
    }
}
