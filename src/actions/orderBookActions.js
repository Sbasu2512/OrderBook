export const updateBuyOrders = (orders) => ({
    type: 'UPDATE_BUY_ORDERS',
    payload: orders,
  });
  
  export const updateSellOrders = (orders) => ({
    type: 'UPDATE_SELL_ORDERS',
    payload: orders,
  });
  
  export const storeOrders = (order) => ({
    type:"STORE_ORDERS",
    payload:order,
  })