const initialState = {
  addedItems: []
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        //...state,
        addedItems: [
          ...state.addedItems,
          { product: action.payload, quantity: 1 }
        ]
      };

    case "REMOVE_FROM_CART":
      const updatedCart = state.addedItems.filter(
        item => item.product.id !== action.payload.id
      );
      return {
        addedItems: updatedCart
      };

    case "INCREASE_QUANTITY":
      const prod = action.payload;
      const prodID = prod.id;
      let newQuantityInc = 0;
      for (let item of state.addedItems) {
        if (item.product.id === prodID) {
          newQuantityInc = item.quantity + 1;
        }
      }
      const newCartInc = state.addedItems.filter(
        item => item.product.id !== prodID
      );

      return {
        addedItems: [
          { product: action.payload, quantity: newQuantityInc },
          ...newCartInc
        ]
      };

    case "DECREASE_QUANTITY":
      let newQuantityDec = 0;
      for (let item of state.addedItems) {
        if (item.product.id === action.payload.id) {
          newQuantityDec = item.quantity - 1;
        }
      }
      const newCartDec = state.addedItems.filter(
        item => item.product.id !== action.payload.id
      );

      if (newQuantityDec > 0) {
        return {
          addedItems: [
            { product: action.payload, quantity: newQuantityDec },
            ...newCartDec
          ]
        };
      } else {
        return {
          addedItems: newCartDec
        };
      }

    default:
      return state;
  }
};

export default cartReducer;
