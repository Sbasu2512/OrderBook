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
  // const buyOrders = useSelector((state) => state.orderBook.buyOrders);
  // const sellOrders = useSelector((state) => state.orderBook.sellOrders);
  // const orders = useSelector((state) => state.orderBook.orders);
  const bids = useSelector((state) => state.orderBook.bids);
  const asks = useSelector((state) => state.orderBook.asks);

  // console.log(bids);

  // {
  //             channelId: data[0],
  //             book_entries: {
  //               price: data[1][i][0],
  //               count: data[1][i][1],
  //               amount: data[1][i][2],
  //             },
  //           }

  return (
    <OrderBookContainer>
      <div className="full-container">
        <OrderBookChart asks={asks} bids={bids} />
      </div>
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
