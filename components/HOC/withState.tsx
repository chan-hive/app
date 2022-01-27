import React from "react";
import { Diff } from "utility-types";
import { RecoilState, SetterOrUpdater, useRecoilState } from "recoil";

// These props will be injected into the base component
export type WithStateProps<T> = {
    state: T;
    setState: SetterOrUpdater<T>;
};

export function withState<T>(state: RecoilState<T>) {
    return <BaseProps extends WithStateProps<T>>(BaseComponent: React.ComponentType<BaseProps>) => {
        type HocProps = Diff<BaseProps, WithStateProps<T>>;

        function Hoc({ ...restProps }: HocProps) {
            const [stateValue, setStateValue] = useRecoilState(state);

            return <BaseComponent {...(restProps as BaseProps)} state={stateValue} setState={setStateValue} />;
        }

        Hoc.displayName = `withState(${BaseComponent.name})`;
        Hoc.WrappedComponent = BaseComponent;

        return Hoc;
    };
}
