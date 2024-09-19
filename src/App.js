import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import OrderBook from './Components/OrderBook';
import useWebSocket from './services/websocketService';

function App() {

  useWebSocket();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <h1>Order Book</h1>
          <OrderBook />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
