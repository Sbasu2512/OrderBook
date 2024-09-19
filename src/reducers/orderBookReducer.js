const initialState = {
    buyOrders: [],
    sellOrders: [],
  };
  
  export default function orderBookReducer(state = initialState, action) {
    switch (action.type) {
      case 'UPDATE_BUY_ORDERS':
        return {
          ...state,
          buyOrders: action.payload,
        };
      case 'UPDATE_SELL_ORDERS':
        return {
          ...state,
          sellOrders: action.payload,
        };
      default:
        return state;
    }
  }
  