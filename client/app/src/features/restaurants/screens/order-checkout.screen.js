import React, { useState, useEffect } from "react";
import {
  List,
  Colors,
  Portal,
  Provider,
  Text,
  Title,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import { SafeArea } from "../../../components/utils/safe-area.component";

import {
  postOrder,
  transformOrder,
} from "../../../services/reservations/order.service";

import {
  OrderList,
  OrderItem,
  DeleteBtn,
  EatTypeCard,
  OrderTotalCard,
  ChangeBtn,
  CheckBtn,
  TypeDialog,
  ConfirmDialog,
  ChangeTypeBtnGrp,
  ChangeTypeBtn,
  SendOrderBtn,
  DontOrderBtn,
} from "./../components/order-checkout.styles";

export const OrderCheckoutScreen = ({ route, navigation }) => {
  const [orderItemList, setOrderItemList] = useState(route.params.orderList);
  const [eatOption, setEatOption] = useState({
    icon: "shopping",
    text: "Pickup",
    apiValue: "TAKE_AWAY",
  });
  const [totalValue, setTotalValue] = useState(null);
  const [changeOpt, setChangeOpt] = useState(false);
  const [confCheckout, setConfCheckout] = useState(false);
  const [optionSelected, setOptionSelected] = useState("pickup");
  const [date, setDate] = useState(new Date());

  const calcTotalValue = () => {
    let tempTotal = 0;
    orderItemList.map((item) => {
      tempTotal += item.price;
    });
    setTotalValue(
      (Math.round((tempTotal + Number.EPSILON) * 100) / 100).toFixed(2)
    );
  };

  const deleteItem = (itemDelete) => {
    setOrderItemList(orderItemList.filter((item) => item.id !== itemDelete.id));
    let newTotal = totalValue - itemDelete.price;
    setTotalValue(
      (Math.round((newTotal + Number.EPSILON) * 100) / 100).toFixed(2)
    );
  };

  const changeOption = () => {
    if (optionSelected === "pickup") {
      setEatOption({
        icon: "shopping",
        text: "Pickup",
        apiValue: "TAKE_AWAY",
      });
    } else {
      setEatOption({
        icon: "table-chair",
        text: "Eat in",
        apiValue: "SIT_AND_EAT",
      });
    }
    setChangeOpt(false);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const checkOut = () => {
    setConfCheckout(true);
  };

  const createOrder = () => {
    console.log("tupe: ", orderItemList);
    const opt = eatOption.apiValue;
    let completeOrder = {
      status: "PENDING",
      type: opt,
      beginTime: date,
      numberOfPeople: 1,
      orders: transformOrder(orderItemList),
      restaurantByReservation: orderItemList[0].menuItemByRestaurant,
    };

    console.log("Complete: ", completeOrder);

    postOrder(completeOrder)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("ERROR: ", error.message);
      })
      .finally(() => {
        navigation.navigate("ReservationConfirm", {
          orderSucces: completeOrder,
          orderItems: orderItemList,
        });
      });
  };

  useEffect(() => {
    calcTotalValue();
  }, [orderItemList]);

  return (
    <Provider>
      <Portal>
        {/* change order type */}
        <TypeDialog visible={changeOpt} onDismiss={() => setChangeOpt(false)}>
          <TypeDialog.Title>Change order type</TypeDialog.Title>
          <TypeDialog.Content>
            <ChangeTypeBtnGrp
              onValueChange={(newVal) => setOptionSelected(newVal)}
              value={optionSelected}
            >
              <ChangeTypeBtn.Item label='Pickup' value='pickup' />
              <ChangeTypeBtn.Item label='Eat In' value='eatin' />
            </ChangeTypeBtnGrp>
          </TypeDialog.Content>
          <TypeDialog.Actions>
            <ChangeBtn onPress={() => changeOption()}>Confirm</ChangeBtn>
          </TypeDialog.Actions>
        </TypeDialog>
        {/* confirm order*/}
        <ConfirmDialog
          visible={confCheckout}
          onDismiss={() => setConfCheckout(false)}
        >
          <ConfirmDialog.Title>Place order?</ConfirmDialog.Title>
          <ConfirmDialog.Content>
            <Text>Click yes to post your order</Text>
          </ConfirmDialog.Content>
          <ConfirmDialog.Actions>
            <DontOrderBtn onPress={() => setConfCheckout(false)}>
              No
            </DontOrderBtn>
            <SendOrderBtn onPress={() => createOrder()}>Yes</SendOrderBtn>
          </ConfirmDialog.Actions>
        </ConfirmDialog>
      </Portal>
      <SafeArea>
        <EatTypeCard>
          <EatTypeCard.Title
            title={eatOption.text}
            left={(props) => (
              <List.Icon
                {...props}
                color={Colors.green700}
                icon={eatOption.icon}
              />
            )}
            right={(props) => (
              <ChangeBtn onPress={() => setChangeOpt(true)}>Change</ChangeBtn>
            )}
          />
          <EatTypeCard.Content>
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={"datetime"}
              is24Hour={true}
              display='default'
              onChange={onChangeDate}
            />
          </EatTypeCard.Content>
        </EatTypeCard>
        <OrderList
          data={orderItemList}
          renderItem={({ item }) => {
            return (
              <OrderItem>
                <OrderItem.Title
                  title={item.naam}
                  right={(props) => (
                    <Title
                      style={{ marginRight: 20 }}
                    >{`€  ${item.price.toFixed(2)}`}</Title>
                  )}
                />
                <OrderItem.Content>
                  {item.note !== "" ? (
                    <Text>{`Notes: ${item.note}`}</Text>
                  ) : (
                    <Text>No notes</Text>
                  )}
                </OrderItem.Content>
                <OrderItem.Actions style={{ justifyContent: "flex-end" }}>
                  <DeleteBtn onPress={() => deleteItem(item)}>Delete</DeleteBtn>
                </OrderItem.Actions>
              </OrderItem>
            );
          }}
          keyExtractor={(item) => item.id}
        />

        <OrderTotalCard>
          <OrderTotalCard.Title
            title={`Total: €${totalValue}`}
            titleStyle={{ color: "#ffffff" }}
          />
          <OrderTotalCard.Actions>
            <CheckBtn mode='contained' onPress={() => checkOut()}>
              Checkout
            </CheckBtn>
          </OrderTotalCard.Actions>
        </OrderTotalCard>
      </SafeArea>
    </Provider>
  );
};
