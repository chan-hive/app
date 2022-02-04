import type { NextPage } from "next";

import Layout from "@components/Layout";

import BoardsRoute from "@routes/Boards";

const Home: NextPage = () => {
    return (
        <Layout>
            <BoardsRoute />
        </Layout>
    );
};

export default Home;
