import { useEffect } from "react";
import { StoreBids, StoreAsks } from "../actions/orderBookActions";
import { store } from "../store";

const useWebSocket = ({ url }) => {
  let socket;

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
      // Handle incoming data
      if (Array.isArray(data)) {
        if (Array.isArray(data[1]) && data[1].length === 3) {
          if (data[1][2] > 0) {
            // Bid
            store.dispatch(
              StoreBids({
                channelId: data[0],
                book_entries: {
                  price: data[1][0],
                  count: data[1][1],
                  amount: data[1][2],
                },
              })
            );
          } else {
            // Ask
            store.dispatch(
              StoreAsks({
                channelId: data[0],
                book_entries: {
                  price: data[1][0],
                  count: data[1][1],
                  amount: data[1][2],
                },
              })
            );
          }
        } else if (Array.isArray(data[1]) && data[1].length) {
          // Bulk update
          data[1].forEach((x) => {
            if (x[2] > 0) {
              // Bid
              store.dispatch(
                StoreBids({
                  channelId: data[0],
                  book_entries: { price: x[0], count: x[1], amount: x[2] },
                })
              );
            } else {
              // Ask
              store.dispatch(
                StoreAsks({
                  channelId: data[0],
                  book_entries: { price: x[0], count: x[1], amount: x[2] },
                })
              );
            }
          });
        }
      }
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };
  };

  return { subscribe };
};

export default useWebSocket;
