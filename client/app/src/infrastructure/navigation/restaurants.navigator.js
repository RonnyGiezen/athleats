import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";
import { RestaurantOrderScreen } from "../../features/restaurants/screens/restaurant-order.screen";
import { OrderCheckoutScreen } from "../../features/restaurants/screens/order-checkout.screen";
import { ReservationConfirmScreen } from "../../features/restaurants/screens/reservation-confirm.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen
        name='Restaurants'
        component={RestaurantsScreen} // every component wich is injected will have Navigate prop at top level
      />
      <RestaurantStack.Screen
        name='RestaurantDetail'
        component={RestaurantDetailScreen}
      />
      <RestaurantStack.Screen
        name='RestaurantOrder'
        component={RestaurantOrderScreen}
      />
      <RestaurantStack.Screen
        name='OrderCheckout'
        component={OrderCheckoutScreen}
      />
      <RestaurantStack.Screen
        options={{
          gestureEnabled: false,
        }}
        name='ReservationConfirm'
        component={ReservationConfirmScreen}
      />
    </RestaurantStack.Navigator>
  );
};
