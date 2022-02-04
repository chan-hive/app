import type { NextPage } from "next";

import Layout from "@components/Layout";

import HomeRoute from "@routes/Home";

export interface BoardRouteProps {
    boardId: string;
}

const Board: NextPage<BoardRouteProps> = ({ boardId }) => {
    return (
        <Layout>
            <HomeRoute boardId={boardId} key={boardId} />
        </Layout>
    );
};

Board.getInitialProps = async ({ query }) => {
    if (!query.boardId || typeof query.boardId !== "string") {
        throw new Error("Failed to retrieve board id from input url.");
    }

    return {
        boardId: query.boardId,
    };
};

export default Board;
