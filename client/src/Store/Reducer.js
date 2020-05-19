import * as actionTypes from './Actions';

const initialState = {
  items: [],
  cartSummary: {
    subtotal: 0,
    totalDiscount: 0,
    total: 0,
    isDisabled: true
  },
  isAllItemsSelected: false
};

const reducer = (state = initialState, action) => {
  let tempState = {};
  switch (action.type) {
    case actionTypes.UPDATE_ITEMS:
      tempState = { ...state };
      tempState.items = action.newItems;
      return tempState;

    case actionTypes.REMOVE_ITEMS:
      tempState = { ...state };
      break;

    case actionTypes.SELECT:
      tempState = { ...state };
      tempState.items = action.items;
      tempState.isAllItemsSelected = action.isAllItemsSelected;
      tempState.cartSummary = action.summary;
      return tempState;

    case actionTypes.UPDATE_ITEMS_SUMMARY:
      tempState = { ...state };
      tempState.items = action.items;
      tempState.cartSummary = action.summary;
      return tempState;

    default:
      return state;
  }

};

export default reducer;