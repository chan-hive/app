import type { NextPage } from "next";

import Layout from "@components/Layout";

import ThreadsRoute from "@routes/Threads";
import { initializeApollo } from "@lib/apollo";

import { BoardDocument, BoardQuery, BoardQueryVariables } from "@query";

export interface BoardRouteProps {
    boardId: string;
    title: string;
}

const Board: NextPage<BoardRouteProps> = ({ boardId, title }) => {
    return (
        <Layout title={`/${boardId}/ - ${title}`}>
            <ThreadsRoute boardId={boardId} key={boardId} />
        </Layout>
    );
};

Board.getInitialProps = async ({ query, req }) => {
    if (!query.boardId || typeof query.boardId !== "string") {
        throw new Error("Failed to retrieve board id from input url.");
    }

    const apolloClient = initializeApollo({
        headers: req?.headers,
    });

    const { data } = await apolloClient.query<BoardQuery, BoardQueryVariables>({
        query: BoardDocument,
        variables: {
            boardId: query.boardId,
        },
    });

    if (!data.board) {
        throw new Error(`Failed to get board with id: /${query.boardId}/.`);
    }

    return {
        boardId: query.boardId,
        title: data.board.title,
    };
};

export default Board;
