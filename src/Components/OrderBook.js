import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import OrderBookChart from "./orderBookChart";
import useWebSocket from "../services/websocketService";

const OrderBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

function OrderBook() {
  const bids = useSelector((state) => state.orderBook.bids);
  const asks = useSelector((state) => state.orderBook.asks);
  const precision = useSelector((state) => state.orderBook.selected_precision);

  const { subscribe } = useWebSocket({
    url: "wss://api-pub.bitfinex.com/ws/2",
  });

  useEffect(() => {
    // Subscribe to the WebSocket with the current precision
    subscribe({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
      prec: precision ? precision : "P0",
    });
  }, [precision]);

  return (
    <OrderBookContainer>
      <OrderBookChart asks={asks} bids={bids} />
    </OrderBookContainer>
  );
}

export default OrderBook;
