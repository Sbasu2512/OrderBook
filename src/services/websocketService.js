import { useEffect } from 'react';
import { updateBuyOrders, updateSellOrders, storeOrders } from '../actions/orderBookActions';
import { store } from '../store';

const useWebSocket = () => {
  useEffect(() => {
    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    socket.onopen = () => {
      console.log('WebSocket Connected');
      socket.send(
        JSON.stringify({
          event: 'subscribe',
          channel: 'book',
          symbol: 'tBTCUSD',
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      // let channelID;
      let book_entries = [];
      // incoming data all ==> [channelID, book_entries]
      //incoming data for book entry ==> [price,count,amount]
      if(Array.isArray(data)){
        for(let i=0; i<data[1].length; i++){
          store.dispatch(storeOrders({
            channelId: data[0],
            book_entries: {
              price: data[1][i][0],
              count: data[1][i][1],
              amount: data[1][i][2],
            }
          }));
       }
      }


    };

    socket.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    // return () => {
    //   socket.close();
    // };
  }, []);
};

export default useWebSocket;
