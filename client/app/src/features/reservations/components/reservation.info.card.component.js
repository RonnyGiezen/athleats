import React from "react";
import { getDay } from "./get.day";
import { List, Headline } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export const ReservationInfoCard = ({ reservation = {} }) => {
  const color =
    reservation.status === "CONFIRMED"
      ? "#1aa61a"
      : reservation.status === "PENDING"
      ? "#ee8c30"
      : reservation.status === "CANCELLED"
      ? "#9f2323"
      : reservation.status === "FINISHED"
      ? "#888"
      : "#000";

  return (
    <List.Section>
      <List.Item
        title={reservation.restaurantByReservation}
        left={() => <Ionicons name='md-restaurant' size={30} />}
      />
      <List.Item
        title={reservation.type}
        left={() => <Ionicons name='folder' size={30} />}
      />
      <List.Item
        title={reservation.status}
        left={() => <Ionicons name='md-calendar' color={color} size={30} />}
      />
      <List.Item
        title={getDay(reservation.beginTime)}
        left={() => <Ionicons name='md-time' size={30} />}
      />
      <List.Item
        title={
          reservation.description ? reservation.description : "No description"
        }
        left={() => <Ionicons name='md-chatbox-ellipses' size={30} />}
      />
      <List.Item
        title={reservation.numberOfPeople}
        left={() => <Ionicons name='md-people' size={30} />}
      />
    </List.Section>
  );
};
