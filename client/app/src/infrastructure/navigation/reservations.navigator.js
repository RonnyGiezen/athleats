import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import {ReservationsScreen} from "../../features/reservations/screen/reservations.screen";
import {ReservationDetailScreen} from "../../features/reservations/screen/reservation.details.screen";


const ReservationStack = createStackNavigator();

export const ReservationsNavigator = () => {
  return (
    <ReservationStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <ReservationStack.Screen
        name='Reservations'
        component={ReservationsScreen}
      />
      <ReservationStack.Screen
        name='ReservationDetail'
        component={ReservationDetailScreen}
      />
    </ReservationStack.Navigator>
  );
};
