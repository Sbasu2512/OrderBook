const precisions = ["P0", "P1", "P2", "P3", "P4"];

const initialState = {
  orders: [],
  asks: [],
  bids: [],
  selected_precision: 0,
};

export default function orderBookReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_PRECISION":
      let prec_idx;
      if (action.payload > 4) {
        prec_idx = 4;
      } else if (action.payload < 0) {
        prec_idx = 0;
      } else {
        prec_idx = action.payload;
      }
      const newState = {
        ...state,
        selected_precision: precisions[prec_idx],
      };
      return newState;

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
