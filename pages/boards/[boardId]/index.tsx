import type { NextPage } from "next";

import ThreadsRoute from "@routes/Threads";
import { initializeApollo } from "@lib/apollo";

import { BoardDocument, BoardQuery, BoardQueryVariables } from "@query";

import { BasePageProps } from "@utils/types";

export interface BoardRouteProps extends BasePageProps {
    boardId: string;
}

const Board: NextPage<BoardRouteProps> = ({ boardId }) => {
    return <ThreadsRoute boardId={boardId} key={boardId} />;
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
        layoutProps: {
            title: `/${query.boardId}/ - ${data.board.title}`,
        },
    };
};

export default Board;
