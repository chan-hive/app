import React from "react";
import { Diff } from "utility-types";

import { ThreadContextValues, useThread } from "@components/Thread/ThreadProvider";

// These props will be injected into the base component
export interface WithThreadProps extends ThreadContextValues {}

export const withThread = <BaseProps extends WithThreadProps>(BaseComponent: React.ComponentType<BaseProps>) => {
    type HocProps = Diff<BaseProps, WithThreadProps>;

    function Hoc({ ...restProps }: HocProps) {
        const threadContextValues = useThread();

        return <BaseComponent {...(restProps as BaseProps)} {...threadContextValues} />;
    }

    Hoc.displayName = `withThread(${BaseComponent.name})`;
    Hoc.WrappedComponent = BaseComponent;

    return Hoc;
};
