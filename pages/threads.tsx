import type { NextPage } from "next";

import Layout from "@components/Layout";

import ThreadsRoute from "@routes/Threads";

const Threads: NextPage = () => {
    return (
        <Layout title="All Threads">
            <ThreadsRoute />
        </Layout>
    );
};

export default Threads;
