import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Platform } from "react-native";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { getReservations } from "../../../services/reservations/reservations.service";

import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ReservationSummaryCard } from "../components/reservation.summary.card.component";
import { LoadingContainer } from "../../../components/utils/LoadingContainer";
import { ReservationsEmptyCard } from "../components/reservations.empty.card.component";

import {
  ReservationList,
  Title,
  RefreshButtonAndroid,
  RefreshButtonIos,
} from "../components/reservation.styles";
import { Colors } from "react-native-paper";

export const ReservationsScreen = ({ navigation }) => {
  const { restaurants } = useContext(RestaurantsContext);

  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshReservations = () => {
    retrieveReservations(true);
  };

  const retrieveReservations = (ignoreLoad) => {
    if (!ignoreLoad) setIsLoading(true);
    getReservations()
      .then((reserves) => {
        !!reserves &&
          !!restaurants &&
          reserves.map((reservation) => {
            reservation.restaurantByReservation = restaurants.filter(
              (r) => r.id === reservation.restaurantByReservation
            )[0].name;
          });
        setReservations(reserves.sort((a, b) => sortReservations(a, b)));
        if (!ignoreLoad) setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const sortReservations = (a, b) => {
    var dateA = new Date(a.beginTime);
    var dateB = new Date(b.beginTime);
    return dateB - dateA;
  };

  useEffect(() => {
    retrieveReservations(true);
  }, []);

  return (
    <SafeArea>
      <Title>Your Reservations</Title>
      {Platform.OS === "ios" ? (
        <RefreshButtonIos
          icon='autorenew'
          color={Colors.green500}
          size={40}
          onPress={() => refreshReservations()}
        />
      ) : (
        <RefreshButtonAndroid
          icon='autorenew'
          color={Colors.green500}
          size={40}
          onPress={() => refreshReservations()}
        />
      )}

      {isLoading ? <LoadingContainer /> : null}
      {!reservations || reservations.length === 0 ? (
        <ReservationsEmptyCard />
      ) : (
        <ReservationList
          data={reservations}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ReservationDetail", {
                    reservation: item,
                  })
                }
              >
                <Spacer position='bottom' size='large'>
                  <ReservationSummaryCard reservation={item} />
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeArea>
  );
};
