import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native-paper";

import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { ReservationsNavigator } from "./reservations.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Reservations: "md-receipt",
  Settings: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    headerShown: false, // dont show header of routes on top of the screen
  };
};

export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: Colors.blue800,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
      <Tab.Screen name='Map' component={MapScreen} />
      <Tab.Screen name='Reservations' component={ReservationsNavigator} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
