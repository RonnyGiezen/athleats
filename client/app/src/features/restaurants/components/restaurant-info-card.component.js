import React, { useEffect } from "react";
import { SvgXml } from "react-native-svg";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import open from "../../../../assets/open";

import {
  Icon,
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Address,
  Section,
  SectionEnd,
  Hours,
} from "./restaurant-info-card.styles";

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    photos = "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",

    address = "Nike Campus",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = false,
    openingsHours = null,
  } = restaurant;

  useEffect(() => {}, []);

  const getDay = (hours) => {
    const d = new Date();
    let day = d.getDay();
    if (hours.length < day) return "";
    return hours[day].openTime + " - " + hours[day].closingTime;
  };

  return (
    <RestaurantCard elevation={5}>
      <RestaurantCardCover key={name} source={{ uri: photos }} />
      <Info>
        <Text variant='label'>{name}</Text>
        <Section>
          {!!openingsHours && <Hours>{getDay(openingsHours)}</Hours>}
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant='error'>CLOSED TEMPORARILY</Text>
            )}
            <Spacer position='left' size='large'>
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position='left' size='large'>
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
