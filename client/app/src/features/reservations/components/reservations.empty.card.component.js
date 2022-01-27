import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {SummaryCard} from "./reservation.styles";

export const ReservationsEmptyCard = ( ) => {
    return (
        <SummaryCard
            title="No reservations yet"
            subtitle="Try one of our restaurants!"
            right={() => <Ionicons name="md-restaurant" size={30}/>}
        />
    );
};
