import type { NextPage } from "next";

import SettingsRoute from "@routes/settings";

import { BasePageProps } from "@utils/types";

const Settings: NextPage<BasePageProps> = () => {
    return <SettingsRoute />;
};

Settings.getInitialProps = async () => {
    return {
        layoutProps: {
            title: "Settings",
        },
    };
};

export default Settings;
