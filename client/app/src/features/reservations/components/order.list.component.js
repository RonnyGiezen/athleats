import React from "react";
import { OrderLine } from "./order.line.component";
import { TotalLine } from "./total.line.component";

export const OrderList = ({ orders = {} }) => {
  orders = orders
    .sort((a, b) => a.menuItem - b.menuItem || a.note < b.note)
    .reduce((accumulator, currentValue) => {
      if (
        accumulator.length > 0 &&
        currentValue.menuItem ===
          accumulator[accumulator.length - 1].menuItem &&
        currentValue.note === accumulator[accumulator.length - 1].note
      ) {
        accumulator[accumulator.length - 1].amount++;
      } else {
        currentValue.amount = 1;
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);

  const total = orders.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.amount * currentValue.menuItemObj.price,
    0
  );
  return (
    <>
      {!!orders &&
        orders.map((order) => {
          return <OrderLine order={order} />;
        })}
      <TotalLine total={total} />
    </>
  );
};
