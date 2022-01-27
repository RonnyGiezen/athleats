import React, { useState } from "react";
import { ScrollView } from "react-native";
import { List, Headline } from "react-native-paper";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utils/safe-area.component";
import { ReservationInfoCard } from "../components/reservation.info.card.component";
import { Ionicons } from "@expo/vector-icons";
import { OrderList } from "../components/order.list.component";

export const ReservationDetailScreen = ({ route }) => {
  const [ordersExpanded, setOrdersExpanded] = useState(false);
  const { reservation } = route.params;

  const price = !!reservation.orders
    ? "Total: €" +
      reservation.orders
        .reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.menuItemObj.price,
          0
        )
        .toFixed(2)
    : "No orders";

  const Title = styled(Headline)`
    margin-left: ${(props) => props.theme.space[2]};
    margin-top: ${(props) => props.theme.space[2]};
  `;

  return (
    <SafeArea>
      <ScrollView>
        <Title>Order Information</Title>
        <ReservationInfoCard reservation={reservation} />
        <List.Accordion
          title={price}
          left={() => <Ionicons name='md-document-text' size={30} />}
          expanded={ordersExpanded}
          onPress={() => setOrdersExpanded(!ordersExpanded)}
        >
          <OrderList
            orders={reservation.orders}
            keyExtractor={(item) => item.id}
          />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
};
