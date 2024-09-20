const initialState = {
  buyOrders: [],
  sellOrders: [],
  orders: [],
  asks: [],
  bids: [],
};

export default function orderBookReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_BUY_ORDERS":
      return {
        ...state,
        buyOrders: action.payload,
      };
    case "UPDATE_SELL_ORDERS":
      return {
        ...state,
        sellOrders: action.payload,
      };
    case "STORE_ORDERS":
      if (!Array.isArray(state.orders)) {
        return {
          ...state,
          orders: [action.payload], // Initialize as array if it's not already
        };
      }

      const orderIndex = state?.orders?.findIndex(
        (order) => order.channelId === action.payload.channelId
      );

      if (orderIndex === -1) {
        return {
          ...state,
          orders: [...state.orders, action.payload],
        };
      } else {
        const newArr = [...state.orders];

        newArr[orderIndex].book_entries = action.payload.book_entries;

        return {
          ...state,
          orders: newArr,
        };
      }

    case "ASKS":
      if (!Array.isArray(state.asks)) {
        return {
          ...state,
          asks: [action.payload], // Initialize as array if it's not already
        };
      }

      const index = state?.asks?.findIndex(
        (order) => order.channelId === action.payload.channelId
      );

      if (index === -1) {
        return {
          ...state,
          asks: [...state.asks, action.payload],
        };
      } else {
        const newArr = [...state.asks];

        newArr[index].book_entries = action.payload.book_entries;

        return {
          ...state,
          asks: newArr,
        };
      }

    case "BIDS":
      if (!Array.isArray(state.asks)) {
        return {
          ...state,
          bids: [action.payload], // Initialize as array if it's not already
        };
      }

      const idx = state?.bids?.findIndex(
        (order) => order.channelId === action.payload.channelId
      );

      if (idx === -1) {
        return {
          ...state,
          bids: [...state.bids, action.payload],
        };
      } else {
        const newArr = [...state.bids];

        newArr[idx].book_entries = action.payload.book_entries;

        return {
          ...state,
          bids: newArr,
        };
      }

    default:
      return state;
  }
}
