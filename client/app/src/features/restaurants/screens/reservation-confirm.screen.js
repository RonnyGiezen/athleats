import React, { useState, useEffect } from "react";
import { Text, Title } from "react-native-paper";

import {
  SuccesText,
  OrderList,
  OrderItem,
  OrderTitle,
  OrderTotalCard,
  InfoText,
} from "../components/confirm.styles";
import { SafeArea } from "../../../components/utils/safe-area.component";

export const ReservationConfirmScreen = ({ route, navigation }) => {
  const order = route.params.orderSucces;
  const orderItems = route.params.orderItems;
  const [totalValue, setTotalValue] = useState(null);

  const calcTotalValue = () => {
    let tempTotal = totalValue !== null ? totalValue : 0;
    orderItems.map((item) => {
      tempTotal += item.price;
    });
    setTotalValue(
      (Math.round((tempTotal + Number.EPSILON) * 100) / 100).toFixed(2)
    );
  };

  useEffect(() => {
    calcTotalValue();
  }, [orderItems]);

  return (
    <SafeArea>
      <SuccesText>{`Your order is succesfully sent and is now ${order.status}`}</SuccesText>
      <OrderTitle>{`Your order:`}</OrderTitle>
      <OrderList
        data={orderItems}
        renderItem={({ item }) => {
          return (
            <OrderItem>
              <OrderItem.Title title={item.naam} subtitle={"€ " + item.price} />
              <OrderItem.Content>
                <Text>{`Notes: ${item.note}`}</Text>
              </OrderItem.Content>
            </OrderItem>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <OrderTotalCard>
        <OrderTotalCard.Title
          title={`Total: € ${totalValue}`}
          titleStyle={{ color: "#ffffff" }}
        />
      </OrderTotalCard>
      <InfoText>
        You can check the status of your order in Reservations or click on
        Restaurant to go back to all restaurants.
      </InfoText>
    </SafeArea>
  );
};
