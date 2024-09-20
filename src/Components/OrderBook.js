import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import OrderBookChart from "./orderBookChart";

const OrderBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const OrderList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OrderItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

function OrderBook() {
  const bids = useSelector((state) => state.orderBook.bids);
  const asks = useSelector((state) => state.orderBook.asks);

  return (
    <OrderBookContainer>
      <OrderBookChart asks={asks} bids={bids} />
    </OrderBookContainer>
  );
}

export default OrderBook;

// {sellOrders.map((order, index) => (
//   <OrderItem key={index}>
//     <span>{order.price}</span>
//     <span>{order.amount}</span>
//     <span>{order.quantity}</span>
//   </OrderItem>
// ))}
