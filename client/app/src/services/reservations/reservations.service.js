import axios from "axios";

// Get menu items of restaurant
export const getReservations = () => {
  return axios
    .get(`/reservations/all`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

const reservationService = {
  getReservations,
};

export default reservationService;
