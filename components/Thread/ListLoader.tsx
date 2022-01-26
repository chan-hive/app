import React from "react";

import { Grid, Theme, useMediaQuery } from "@mui/material";
import ThreadCard from "@components/Thread/Card";

const EMPTY_ARRAYS = [new Array(1).fill(null), new Array(2).fill(null), new Array(3).fill(null), new Array(4).fill(null)];

export default function ThreadListLoader() {
    const xsMatched = useMediaQuery((theme: Theme) => theme.breakpoints.up("xs"));
    const smMatched = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
    const mdMatched = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
    const lgMatched = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

    let columnCount = 0;
    if (lgMatched) {
        columnCount = 4;
    } else if (mdMatched) {
        columnCount = 3;
    } else if (smMatched) {
        columnCount = 2;
    } else if (xsMatched) {
        columnCount = 1;
    }

    if (!columnCount) {
        return null;
    }

    return (
        <Grid container spacing={2} alignItems="stretch">
            {EMPTY_ARRAYS[columnCount - 1].map((_, index) => (
                <Grid key={+index} item xs={12} sm={6} md={6} lg={3}>
                    <ThreadCard />
                </Grid>
            ))}
        </Grid>
    );
}
