export const changePrecision = (precision) => ({
  type: "CHANGE_PRECISION",
  payload: precision,
});

export const storeOrders = (order) => ({
  type: "STORE_ORDERS",
  payload: order,
});

export const StoreAsks = (order) => ({
  type: "ASKS",
  payload: order,
});

export const StoreBids = (order) => ({
  type: "BIDS",
  payload: order,
});
