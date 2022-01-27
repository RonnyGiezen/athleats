import axios from "axios";

// post order to the backend
export const postOrder = (reservation) => {
  return axios
    .post("/reservations", reservation)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const transformOrder = (order = []) => {
  const mappedOrders = order.map((item) => {
    return {
      note: item.note,
      menuItem: item.id,
    };
  });
  return mappedOrders;
};
