import React from "react";
import { Card, Headline, Paragraph } from "react-native-paper";
import { SpaceContainerComponent } from "./space.container.component";

export const TotalLine = ({ total }) => {
  return (
    <>
      <Card style={{ backgroundColor: "#efefef" }}>
        <Card.Content>
          <SpaceContainerComponent>
            <Headline>Total:</Headline>
            <Headline style={{ color: "#333" }}>€{total.toFixed(2)}</Headline>
          </SpaceContainerComponent>
          <SpaceContainerComponent>
            <Paragraph>Btw:</Paragraph>
            <Paragraph style={{ fontWeight: "900" }}>
              €{(total * 0.09).toFixed(2)}
            </Paragraph>
          </SpaceContainerComponent>
        </Card.Content>
      </Card>
    </>
  );
};
