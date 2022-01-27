import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Card, Headline, IconButton } from "react-native-paper";

export const ReservationList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const SummaryCard = styled(Card.Title).attrs({})`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: 15px;
  margin-left: ${(props) => props.theme.space[1]};
  margin-right: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[1]};
  border-radius: 5px;
`;

export const Title = styled(Headline)`
  margin: ${(props) => props.theme.space[3]};
`;

export const RefreshButtonAndroid = styled(IconButton)`
  position: absolute;
  margin: 10px;
  right: 5px;
  top: 0px;
`;

export const RefreshButtonIos = styled(IconButton)`
  position: absolute;
  margin: 10px;
  right: 15px;
  top: 35px;
`;
