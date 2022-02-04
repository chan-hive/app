import React from "react";

import { FooterItemValue, Item } from "@components/UI/CardFooterItem.styles";

export interface CardFooterItemProps {
    children: React.ReactNode;
    icon: React.ComponentType;
}

export default function CardFooterItem(props: CardFooterItemProps) {
    const { children, icon: Icon } = props;

    return (
        <Item>
            <Icon />
            <FooterItemValue variant="body1">{children}</FooterItemValue>
        </Item>
    );
}
