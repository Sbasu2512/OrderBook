import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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
  const buyOrders = useSelector((state) => state.orderBook.buyOrders);
  const sellOrders = useSelector((state) => state.orderBook.sellOrders);

  useEffect(() => {
    // Websocket connection is already managed in websocketService.js
  }, []);

  return (
    <OrderBookContainer>
      <h2>Order Book</h2>
      <div>
        <h3>Buy Orders</h3>
        <OrderList>
          {buyOrders.map((order, index) => (
            <OrderItem key={index}>
              <span>{order.price}</span>
              <span>{order.amount}</span>
              <span>{order.quantity}</span>
            </OrderItem>
          ))}
        </OrderList>
      </div>
      <div>
        <h3>Sell Orders</h3>
        <OrderList>
          {sellOrders.map((order, index) => (
            <OrderItem key={index}>
              <span>{order.price}</span>
              <span>{order.amount}</span>
              <span>{order.quantity}</span>
            </OrderItem>
          ))}
        </OrderList>
      </div>
    </OrderBookContainer>
  );
}

export default OrderBook;
