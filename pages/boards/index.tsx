import type { NextPage } from "next";

import BoardsRoute, { BoardsRouteProps } from "@routes/Boards";
import { BasePageProps } from "@utils/types";

export interface BoardsPageProps extends BoardsRouteProps, BasePageProps {}

const Boards: NextPage<BoardsPageProps> = () => {
    return <BoardsRoute />;
};

Boards.getInitialProps = async () => ({
    layoutProps: {
        title: "Boards",
    },
});

export default Boards;
