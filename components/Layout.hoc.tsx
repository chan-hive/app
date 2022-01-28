import React from "react";
import { Diff } from "utility-types";

import { LayoutContextValues, useLayout } from "@components/Layout";

// These props will be injected into the base component
export interface WithLayoutProps extends LayoutContextValues {}

export const withLayout = <BaseProps extends WithLayoutProps>(BaseComponent: React.ComponentType<BaseProps>) => {
    type HocProps = Diff<BaseProps, WithLayoutProps>;

    function Hoc({ ...restProps }: HocProps) {
        const data = useLayout();

        return <BaseComponent {...(restProps as BaseProps)} {...data} />;
    }

    Hoc.displayName = `withLayout(${BaseComponent.name})`;
    Hoc.WrappedComponent = BaseComponent;

    return Hoc;
};
