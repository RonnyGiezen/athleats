import React from "react";
import { Card, Paragraph, Subheading } from "react-native-paper";
import { SpaceContainerComponent } from "./space.container.component";

export const OrderLine = (props) => {
  let order = props.order;
  return (
    <Card>
      <Card.Content>
        <SpaceContainerComponent>
          <Paragraph style={{ color: "#999" }}>{order.amount} x </Paragraph>
          <Paragraph style={{ color: "#bbb" }}>
            {order.menuItemObj.price.toFixed(2)}
          </Paragraph>
        </SpaceContainerComponent>
        <SpaceContainerComponent>
          <Subheading>{order.menuItemObj.naam}</Subheading>
          {!order.note && (
            <Subheading style={{ fontWeight: "900" }}>
              {(order.menuItemObj.price * order.amount).toFixed(2)}
            </Subheading>
          )}
        </SpaceContainerComponent>
        {!!order.note && (
          <SpaceContainerComponent>
            <Paragraph style={{ color: "#999" }}>{order.note}</Paragraph>
            <Subheading style={{ fontWeight: "900" }}>
              {(order.menuItemObj.price * order.amount).toFixed(2)}
            </Subheading>
          </SpaceContainerComponent>
        )}
      </Card.Content>
    </Card>
  );
};
