import type { NextPage } from "next";

import Layout from "@components/Layout";

import HomeRoute from "@routes/Home";

const Home: NextPage = () => {
    return (
        <Layout>
            <HomeRoute />
        </Layout>
    );
};

export default Home;
