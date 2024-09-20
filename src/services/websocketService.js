import { useEffect, useRef } from "react";
import { StoreBids, StoreAsks } from "../actions/orderBookActions";
import { store } from "../store";

const useWebSocket = ({ url }) => {
  let socket;
  let bidsBuffer = [];
  let asksBuffer = [];

  const subscribe = ({ event, channel, symbol, prec }) => {
    if (!socket) {
      socket = new WebSocket(url);
    }

    socket.onopen = () => {
      console.log("WebSocket Connected");
      socket.send(
        JSON.stringify({
          event,
          channel,
          symbol,
          prec,
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (Array.isArray(data)) {
        // Check if it's a book entry or bulk update
        if (Array.isArray(data[1]) && data[1].length === 3) {
          if (data[1][2] > 0) {
            bidsBuffer.push({
              channelId: data[0],
              book_entries: {
                price: data[1][0],
                count: data[1][1],
                amount: data[1][2],
              },
            });
          } else {
            asksBuffer.push({
              channelId: data[0],
              book_entries: {
                price: data[1][0],
                count: data[1][1],
                amount: data[1][2],
              },
            });
          }
        } else if (Array.isArray(data[1]) && data[1].length) {
          data[1].forEach((x) => {
            if (x[2] > 0) {
              bidsBuffer.push({
                channelId: data[0],
                book_entries: { price: x[0], count: x[1], amount: x[2] },
              });
            } else {
              asksBuffer.push({
                channelId: data[0],
                book_entries: { price: x[0], count: x[1], amount: x[2] },
              });
            }
          });
        }
      }
    };

    const intervalId = setInterval(() => {
      if (bidsBuffer.length > 0) {
        store.dispatch(StoreBids(bidsBuffer));
        bidsBuffer = [];
      }
      if (asksBuffer.length > 0) {
        store.dispatch(StoreAsks(asksBuffer));
        asksBuffer = [];
      }
    }, 1000);

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
      clearInterval(intervalId);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };
  };

  return { subscribe };
};

export default useWebSocket;
