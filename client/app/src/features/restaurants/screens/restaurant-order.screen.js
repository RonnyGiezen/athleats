import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Portal, Provider, Colors, List, Text } from "react-native-paper";

import {
  MenuItem,
  RestaurantTitle,
  OrderFAB,
  OrderItemDialog,
  OrderButton,
  NoteInput,
  OrderFabBadge,
  SnackCard,
  UndoBtn,
} from "./../components/order.styles";

import { SafeArea } from "../../../components/utils/safe-area.component";

import { restaurantMenuItemsApi } from "../../../services/restaurants/restaurants.service";

export const RestaurantOrderScreen = ({ route, navigation }) => {
  const { restaurantId } = route.params;
  const [menuItems, setMenuItems] = useState([]);
  const [bfastItems, setBfastItems] = useState([]);
  const [lunchItems, setLunchItems] = useState([]);
  const [drinkItems, setDrinkItems] = useState([]);
  const [dinnerItems, setDinnerItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);

  const [tempClickedItem, setTempClickedItem] = useState({
    id: "",
    naam: "",
    type: "",
    price: "",
    menuItemByRestaurant: "",
  });
  const [notes, setNotes] = useState("");
  const [count, setCount] = useState(0);

  const hideDialog = () => {
    setVisible(false);
  };

  const openItem = (item) => {
    setTempClickedItem(item);
    setVisible(true);
  };

  const addItem = (newItem) => {
    setOrderItems([...orderItems, newItem]);
    setNotes("");
    hideDialog();
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const cancelItem = (item) => {
    setOrderItems(orderItems.filter((i) => i.id !== item.id));
    setAdded(false);
  };

  const getAllMenuItems = () => {
    setMenuItems([]);

    restaurantMenuItemsApi(restaurantId)
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

  useEffect(() => {
    setCount(orderItems.length);
  }, [orderItems]);

  return (
    <Provider>
      <Portal>
        <OrderItemDialog visible={visible} onDismiss={hideDialog}>
          <OrderItemDialog.Title>{tempClickedItem.naam}</OrderItemDialog.Title>
          <OrderItemDialog.Content>
            <Text>{"€ " + tempClickedItem.price}</Text>
            <NoteInput
              label='Notes'
              value={notes}
              multiline={true}
              onChangeText={(note) => setNotes(note)}
            />
          </OrderItemDialog.Content>
          <OrderItemDialog.Actions>
            <OrderButton
              onPress={() => addItem({ ...tempClickedItem, note: notes })}
            >
              Add
            </OrderButton>
          </OrderItemDialog.Actions>
        </OrderItemDialog>
        {added && (
          <SnackCard>
            <SnackCard.Title
              title={`${tempClickedItem.naam} added to basket`}
              titleStyle={{ color: "#ffffff" }}
              right={(props) => (
                <UndoBtn onPress={() => cancelItem(tempClickedItem)}>
                  UNDO
                </UndoBtn>
              )}
            />
          </SnackCard>
        )}
      </Portal>
      <SafeArea>
        <ScrollView>
          <RestaurantTitle>Breakfast</RestaurantTitle>
          {bfastItems.map((item, index) => (
            <TouchableOpacity
              onPress={() => openItem(item)}
              keyExtractor={index}
            >
              <MenuItem>
                <MenuItem.Title
                  title={item.naam}
                  subtitle={"€ " + item.price.toFixed(2)}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      color={Colors.blue300}
                      icon='bread-slice'
                    />
                  )}
                />
              </MenuItem>
            </TouchableOpacity>
          ))}
          <RestaurantTitle>Lunch</RestaurantTitle>
          {lunchItems.map((item, index) => (
            <TouchableOpacity
              onPress={() => openItem(item)}
              keyExtractor={index}
            >
              <MenuItem>
                <MenuItem.Title
                  title={item.naam}
                  subtitle={"€ " + item.price.toFixed(2)}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      color={Colors.yellow500}
                      icon='hamburger'
                    />
                  )}
                />
              </MenuItem>
            </TouchableOpacity>
          ))}
          <RestaurantTitle>Dinner</RestaurantTitle>
          {dinnerItems.map((item, index) => (
            <TouchableOpacity
              onPress={() => openItem(item)}
              keyExtractor={index}
            >
              <MenuItem>
                <MenuItem.Title
                  title={item.naam}
                  subtitle={"€ " + item.price.toFixed(2)}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      color={Colors.red500}
                      icon='food-variant'
                    />
                  )}
                />
              </MenuItem>
            </TouchableOpacity>
          ))}
          <RestaurantTitle>Drinks</RestaurantTitle>
          {drinkItems.map((item, index) => (
            <TouchableOpacity
              onPress={() => openItem(item)}
              keyExtractor={index}
            >
              <MenuItem>
                <MenuItem.Title
                  title={item.naam}
                  subtitle={"€ " + item.price.toFixed(2)}
                  left={(props) => (
                    <List.Icon {...props} color={Colors.green500} icon='cup' />
                  )}
                />
              </MenuItem>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <OrderFAB
          icon='basket'
          onPress={() =>
            navigation.navigate("OrderCheckout", { orderList: orderItems })
          }
        />
        {count >= 1 ? <OrderFabBadge size={30}>{count}</OrderFabBadge> : null}
      </SafeArea>
    </Provider>
  );
};
