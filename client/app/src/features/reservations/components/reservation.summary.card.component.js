import React from "react";
import {getDay} from "./get.day";
import {Ionicons} from "@expo/vector-icons";
import {SummaryCard} from "./reservation.styles";

export const ReservationSummaryCard = ({ reservation = {} }) => {

    const color =
        reservation.status === "CONFIRMED" ? "#1aa61a" :
            reservation.status === "PENDING" ? "#ee8c30" :
                reservation.status === "CANCELLED" ? "#9f2323" :
                    reservation.status === "FINISHED" ? "#888" :
                        "#000";
    return (
        <SummaryCard
            title={reservation.restaurantByReservation}
            subtitle={getDay(reservation.beginTime)}
            right={() => <Ionicons name="md-calendar" color={color} size={30}/>}
        />
    );
};
