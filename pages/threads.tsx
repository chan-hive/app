import type { NextPage } from "next";

import ThreadsRoute from "@routes/Threads";

import { BasePageProps } from "@utils/types";

const Threads: NextPage<BasePageProps> = () => {
    return <ThreadsRoute />;
};

Threads.getInitialProps = async () => {
    return {
        layoutProps: {
            title: "All Threads",
        },
    };
};

export default Threads;
