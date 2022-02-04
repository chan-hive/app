import type { NextPage } from "next";

import Layout from "@components/Layout";

import BoardsRoute, { BoardsRouteProps } from "@routes/Boards";

const Boards: NextPage<BoardsRouteProps> = () => {
    return (
        <Layout title="Boards">
            <BoardsRoute />
        </Layout>
    );
};

export default Boards;
