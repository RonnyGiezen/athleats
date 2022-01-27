import axios from "axios";
import camelize from "camelize";

/**
 *
 * @returns Promise of JSON result of the restaurants API
 */
export const restaurantsRequestApi = () => {
  return axios
    .get(`/restaurants`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => log(error));
};

export const restaurantsApiTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: "Nike Campus",
      isClosedTemporarily: restaurant.isClosedTemp,
      placeId: restaurant.id,
      rating: 4,
      isOpenNow: true,
    };
  });
  return camelize(mappedResults);
};

// Get menu items of restaurant
export const restaurantMenuItemsApi = (id) => {
  return axios
    .get(`/menuItems/restaurant/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
