import { useEffect } from "react";
import {
  updateBuyOrders,
  updateSellOrders,
  storeOrders,
  StoreBids,
  StoreAsks,
} from "../actions/orderBookActions";
import { store } from "../store";

const useWebSocket = () => {
  useEffect(() => {
    const socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

    socket.onopen = () => {
      console.log("WebSocket Connected");
      socket.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          symbol: "tBTCUSD",
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // incoming data all ==> [channelID, book_entries]
      //incoming data for book entry ==> [price,count,amount]
      //Total amount available at that price level.
      //Trading: if AMOUNT > 0 then bid else ask
      // console.log(data);
      if (Array.isArray(data)) {
        if (Array.isArray(data[1]) && data[1].length === 3) {
          // if AMOUNT > 0 then bid else ask
          if (data[1][2] > 0) {
            //bid
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
            //ask
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
        } else {
          //bulk update
          if (Array.isArray(data[1]) && data[1].length) {
            data[1].forEach((x) => {
              if (x[2] > 0) {
                //bid
                store.dispatch(
                  StoreBids({
                    channelId: data[0],
                    book_entries: { price: x[0], count: x[1], amount: x[2] },
                  })
                );
              } else {
                //ask
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
      }
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    // return () => {
    //   socket.close();
    // };
  }, []);
};

export default useWebSocket;
