const precisions = ["P0", "P1", "P2", "P3", "P4"];

const initialState = {
  orders: [],
  asks: [],
  bids: [],
  selected_precision: "P0",
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
      // Ensure `asks` is initialized as an array
      let currentAsks = Array.isArray(state.asks) ? [...state.asks] : [];

      // Use a map to track the latest `channelId` entries
      const asksMap = new Map();

      // Add current state `asks` to the map
      currentAsks.forEach((ask) => {
        asksMap.set(ask.channelId, ask);
      });

      // Iterate over the incoming payload, overwriting any duplicates by `channelId`
      action.payload.forEach((newAsk) => {
        asksMap.set(newAsk.channelId, newAsk); // Last one wins
      });

      return {
        ...state,
        asks: Array.from(asksMap.values()), // Convert the map back into an array
      };

    case "BIDS":
      // Ensure `bids` is initialized as an array
      let currentBids = Array.isArray(state.bids) ? [...state.bids] : [];

      // Use a map to track the latest `channelId` entries
      const bidsMap = new Map();

      // Add current state `bids` to the map
      currentBids.forEach((bid) => {
        bidsMap.set(bid.channelId, bid);
      });

      // Iterate over the incoming payload, overwriting any duplicates by `channelId`
      action.payload.forEach((newBid) => {
        bidsMap.set(newBid.channelId, newBid); // Last one wins
      });

      return {
        ...state,
        bids: Array.from(bidsMap.values()), // Convert the map back into an array
      };

    default:
      return state;
  }
}
