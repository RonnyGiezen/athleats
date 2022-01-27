import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-paper";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { LoadingContainer } from "../../../components/utils/LoadingContainer";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

export const MapScreen = () => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const [active, setActive] = useState(null);

  const region = {
    latitude: 52.2130952,
    longitude: 5.1919945,
    latitudeDelta: 0.00001,
    longitudeDelta: 0.00001,
  };
  if (!!restaurants && restaurants.filter((r) => r.id < 10000).length > 0) {
    const latlong = restaurants
      .filter((r) => r.id < 10000)
      .map((restaurant) => {
        const [lat, long] = restaurant.location.split(",");
        return { lat: parseFloat(lat), long: parseFloat(long) };
      });

    region.latitude = [
      latlong.reduce(
        (sum, cur) => {
          sum.min = Math.min(sum.min, cur.lat);
          sum.max = Math.max(sum.max, cur.lat);
          return sum;
        },
        { min: 400, max: 0 }
      ),
    ].map((sum) => {
      return (sum.max + sum.min) / 2;
    })[0];

    region.longitude = [
      latlong.reduce(
        (sum, cur) => {
          sum.min = Math.min(sum.min, cur.long);
          sum.max = Math.max(sum.max, cur.long);
          return sum;
        },
        { min: 400, max: 0 }
      ),
    ].map((sum) => {
      return (sum.max + sum.min) / 2;
    })[0];

    region.latitudeDelta =
      [
        latlong.reduce(
          (sum, cur) => {
            sum.min = Math.min(sum.min, cur.lat);
            sum.max = Math.max(sum.max, cur.lat);
            return sum;
          },
          { min: 400, max: 0 }
        ),
      ].map((sum) => {
        return sum.max - sum.min;
      })[0] * 1.5;

    region.longitudeDelta =
      [
        latlong.reduce(
          (sum, cur) => {
            sum.min = Math.min(sum.min, cur.long);
            sum.max = Math.max(sum.max, cur.long);
            return sum;
          },
          { min: 400, max: 0 }
        ),
      ].map((sum) => {
        return sum.max - sum.min;
      })[0] * 1.5;
  }

  const setRestaurant = (restaurant) => {
    setActive(restaurant);
  };

  return (
    <SafeArea>
      {isLoading && <LoadingContainer />}
      <MapView
        style={{ height: "100%" }}
        initialRegion={region}
        onPress={() => setRestaurant(null)}
      >
        {!!restaurants &&
          restaurants
            .filter((r) => r.id < 10000)
            .map((restaurant) => {
              const [lat, long] = restaurant.location.split(",");
              const coordinate = {
                latitude: parseFloat(lat),
                longitude: parseFloat(long),
              };
              return (
                <Marker
                  coordinate={coordinate}
                  style={{ zIndex: 20 }}
                  key={"mark" + restaurant.id}
                  onPress={() => setRestaurant(restaurant)}
                >
                  <StyledMarker
                    coordinate={coordinate}
                    restaurant={restaurant}
                  />
                </Marker>
              );
            })}
      </MapView>
      {!!active && (
        <PopUpRestaurant active={active} setRestaurant={setRestaurant} />
      )}
    </SafeArea>
  );
};

const PopUpRestaurant = ({ active }) => {
  useEffect(() => {}, [active]);
  return (
    <View
      style={{
        padding: 10,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <RestaurantInfoCard
        restaurant={active}
        style={{ position: "absolute", bottom: 0, left: 0 }}
      />
    </View>
  );
};

const StyledMarker = ({ restaurant }) => {
  return (
    <View
      style={{
        paddingVertical: 8,
        width: 200,
        height: 100,
        position: "relative",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 30,
          left: 5,
          width: 100,
          borderRadius: 10,
          borderColor: "rgba(255,255,255,.5)",
          borderWidth: 1,
          borderStyle: "solid",
          transform: [{ translateX: 50 }],
        }}
      >
        <Text style={{ textAlign: "center", borderRadius: 10, padding: 5 }}>
          {restaurant.name.substr(0, 10)}...
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#06d3ff",
          height: 30,
          width: 30,
          borderBottomRightRadius: 1000,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 1000,
          borderTopLeftRadius: 1000,
          transform: [{ rotate: "-45deg" }],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: 90,
          bottom: 5,
        }}
      >
        <Ionicons
          name='md-restaurant'
          style={{
            transform: [{ rotate: "45deg" }],
          }}
          color={"#fff"}
          size={20}
        />
      </View>
    </View>
  );
};
