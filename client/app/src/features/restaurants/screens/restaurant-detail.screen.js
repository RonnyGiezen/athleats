import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { List, Button } from "react-native-paper";
import styled from "styled-components/native";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { restaurantMenuItemsApi } from "../../../services/restaurants/restaurants.service";

import { SafeArea } from "../../../components/utils/safe-area.component";

export const ReservationButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.ui.primary};
  width: 70%;
  margin: auto;
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const RestaurantDetailScreen = ({ route, navigation }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [bfastItems, setBfastItems] = useState([]);
  const [lunchItems, setLunchItems] = useState([]);
  const [drinkItems, setDrinkItems] = useState([]);
  const [dinnerItems, setDinnerItems] = useState([]);
  const { restaurant } = route.params;

  const getAllMenuItems = () => {
    setMenuItems([]);

    restaurantMenuItemsApi(restaurant.id)
      .then((items) => {
        setMenuItems(items);
      })

      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };

  const filterMenuList = () => {
    const bfast = menuItems.filter((item) => item.type === "BREAKFAST");
    const lunch = menuItems.filter((item) => item.type === "LUNCH");
    const dinner = menuItems.filter((item) => item.type === "DINNER");
    const drinks = menuItems.filter((item) => item.type === "DRINKS");

    setBfastItems(bfast);
    setLunchItems(lunch);
    setDrinkItems(drinks);
    setDinnerItems(dinner);
  };

  useEffect(() => {
    getAllMenuItems();
  }, []);

  useEffect(() => {
    filterMenuList();
  }, [menuItems]);

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Accordion
          title='Breakfast'
          left={(props) => <List.Icon {...props} icon='bread-slice' />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          {bfastItems.map((item, index) => (
            <List.Item title={item.naam} key={index} />
          ))}
        </List.Accordion>

        <List.Accordion
          title='Lunch'
          left={(props) => <List.Icon {...props} icon='hamburger' />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          {lunchItems.map((item, index) => (
            <List.Item title={item.naam} key={index} />
          ))}
        </List.Accordion>

        <List.Accordion
          title='Dinner'
          left={(props) => <List.Icon {...props} icon='food-variant' />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          {dinnerItems.map((item, index) => (
            <List.Item title={item.naam} key={index} />
          ))}
        </List.Accordion>

        <List.Accordion
          title='Drinks'
          left={(props) => <List.Icon {...props} icon='cup' />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          {drinkItems.map((item, index) => (
            <List.Item title={item.naam} key={index} />
          ))}
        </List.Accordion>
      </ScrollView>
      <ReservationButton
        mode='contained'
        onPress={() =>
          navigation.navigate("RestaurantOrder", {
            restaurantId: restaurant.id,
          })
        }
      >
        Order
      </ReservationButton>
    </SafeArea>
  );
};
