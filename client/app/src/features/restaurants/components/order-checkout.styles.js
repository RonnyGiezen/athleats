import {
  Dialog,
  Headline,
  Card,
  Button,
  RadioButton,
} from "react-native-paper";
import { FlatList } from "react-native";
import styled from "styled-components/native";

export const OrderTitle = styled(Headline)`
  padding: ${(props) => props.theme.space[3]};
`;

export const TypeDialog = styled(Dialog)``;

export const ConfirmDialog = styled(Dialog)``;

export const ChangeTypeBtnGrp = styled(RadioButton.Group)``;

export const ChangeTypeBtn = styled(RadioButton)``;

export const ChangeCont = styled.View``;

export const OptText = styled.Text``;

export const OrderList = styled(FlatList)`
  height: 100%;
  width: 100%;
`;

export const OrderItem = styled(Card)`

  margin-left: ${(props) => props.theme.space[1]}
  margin-right: ${(props) => props.theme.space[1]}
  margin-bottom: ${(props) => props.theme.space[1]}
`;

export const DeleteBtn = styled(Button).attrs((props) => ({
  color: props.theme.colors.ui.error,
}))`
  right: 0;
`;

export const DateBtn = styled(Button).attrs((props) => ({
  color: props.theme.colors.ui.error,
}))`
  right: 0;
`;

export const SendOrderBtn = styled(Button).attrs((props) => ({
  color: props.theme.colors.ui.success,
}))`
  right: ${(props) => props.theme.space[2]};
`;

export const DontOrderBtn = styled(Button).attrs((props) => ({
  color: props.theme.colors.ui.error,
}))`
  right: ${(props) => props.theme.space[2]};
`;

export const ChangeBtn = styled(Button).attrs((props) => ({
  color: props.theme.colors.ui.success,
}))`
  right: 0;
`;

export const EatTypeCard = styled(Card)`
  margin-left: ${(props) => props.theme.space[1]};
  margin-right: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const OrderTotalCard = styled(Card)`
  position: relative;
  width: 100%;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const CheckBtn = styled(Button)`
  background-color: ${(props) => props.theme.colors.ui.secondary};
  width: 70%;
  margin: auto;
  margin-bottom: ${(props) => props.theme.space[2]};
`;
