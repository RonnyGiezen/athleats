import {
  Dialog,
  FAB,
  Headline,
  Card,
  Button,
  TextInput,
  Badge,
  Snackbar,
} from "react-native-paper";
import { FlatList } from "react-native";
import styled from "styled-components/native";

export const ConfirmSnack = styled(Snackbar)`
  top: 0;
`;

export const OrderFAB = styled(FAB)`
  background-color: ${(props) => props.theme.colors.ui.secondary};
  position: absolute;
  margin: 16px;
  right: 0;
  bottom: 0;
`;

export const OrderFabBadge = styled(Badge)`
  position: absolute;
  margin: 10px;
  bottom: 50px;
  right: 5px;
`;

export const OrderButton = styled(Button)``;

export const OrderItemDialog = styled(Dialog)`
  border-radius: 15px;
`;

export const NoteInput = styled(TextInput)`
  margin-top: ${(props) => props.theme.space[3]};
`;

export const MenuItem = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: ${(props) => props.theme.space[1]};
  margin-left: ${(props) => props.theme.space[1]};
  margin-right: ${(props) => props.theme.space[1]};
  border-radius: 5px;
`;

export const MenuItemCard = styled(Card)``;

export const SnackCard = styled(Card)`
  position: absolute;
  width: 98%;
  top: 10px;
  padding: 0;
  margin: ${(props) => props.theme.space[1]}
  background-color: ${(props) => props.theme.colors.ui.primary}
`;

export const UndoBtn = styled(Button).attrs((props) => ({
  color: props.theme.colors.ui.error,
}))``;

export const RestaurantTitle = styled(Headline)`
  padding: ${(props) => props.theme.space[3]};
  line-height: ${(props) => props.theme.lineHeights.title};
`;

export const Breakfast = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  height: 100%;
`;

export const ItemList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  height: 100%;
`;

export const Lunch = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  height: 100%;
`;

export const Dinner = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  height: 100%;
`;

export const Drinks = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  height: 100%;
`;
