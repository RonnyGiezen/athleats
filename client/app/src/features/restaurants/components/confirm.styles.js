import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Card, Text, Headline } from "react-native-paper";

export const OrderTitle = styled(Headline)`
  padding: ${(props) => props.theme.space[3]};
`;

export const SuccesText = styled(Text)`
  color: ${(props) => props.theme.colors.text.success};
  margin-top: ${(props) => props.theme.space[4]};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;

export const InfoText = styled(Text)`
  color: ${(props) => props.theme.colors.text.secondary};
  margin: ${(props) => props.theme.space[4]};
`;

export const OrderList = styled(FlatList)`
  width: 100%;
`;

export const OrderItem = styled(Card)`
  margin-left: ${(props) => props.theme.space[1]}
  margin-right: ${(props) => props.theme.space[1]}
  margin-bottom: ${(props) => props.theme.space[1]}
`;

export const OrderTotalCard = styled(Card)`
margin-left: ${(props) => props.theme.space[1]}
margin-right: ${(props) => props.theme.space[1]}
margin-bottom: ${(props) => props.theme.space[1]}
  background-color: ${(props) => props.theme.colors.ui.primary};
`;
