import { updateBuyOrders, updateSellOrders } from '../actions/orderBookActions';
import { store } from '../store';

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
  // Handle the data update here
  if (Array.isArray(data)) {
    const [channelID, orderType, orders] = data;
    if (orderType === 'buy') {
      store.dispatch(updateBuyOrders(orders));
    } else if (orderType === 'sell') {
      store.dispatch(updateSellOrders(orders));
    }
  }
};

socket.onclose = () => {
  console.log('WebSocket Disconnected');
};

socket.onerror = (error) => {
  console.error('WebSocket Error: ', error);
};

export default socket;
