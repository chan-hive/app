import React from "react";
import { Diff } from "utility-types";

import { ThreadContextValue, useThread } from "@components/thread/Context";

// These props will be injected into the base component
export interface WithThreadProps extends ThreadContextValue {}

export const withThread = <BaseProps extends WithThreadProps>(BaseComponent: React.ComponentType<BaseProps>) => {
    type HocProps = Diff<BaseProps, WithThreadProps>;

    function Hoc({ ...restProps }: HocProps) {
        const threadValues = useThread();

        return <BaseComponent {...(restProps as BaseProps)} {...threadValues} />;
    }

    Hoc.displayName = `WithThread(${BaseComponent.name})`;
    Hoc.WrappedComponent = BaseComponent;

    return Hoc;
};
