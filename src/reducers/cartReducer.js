const initialState = {
  addedItems: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        addedItems: [
          ...state.addedItems,
          { product: action.payload, quantity: 1 },
        ],
      };

    case "INCREASE_QUANTITY":
      const newCartInc = state.addedItems.map((item) => {
        if (item.product.id === action.payload.id)
          return { product: action.payload, quantity: item.quantity + 1 };
        else return item;
      });

      return {
        addedItems: [...newCartInc],
      };

    case "DECREASE_QUANTITY":
      let prod = state.addedItems.find(
        (item) => item.product.id === action.payload.id
      );
      let prodQuantity = prod.quantity;
      let newCartDec;
      if (prodQuantity === 1) {
        newCartDec = state.addedItems.filter(
          (item) => item.product.id !== action.payload.id
        );
      } else {
        newCartDec = state.addedItems.map((item) => {
          if (item.product.id === action.payload.id)
            return { product: action.payload, quantity: item.quantity - 1 };
          else return item;
        });
      }

      return {
        addedItems: [...newCartDec],
      };
    case "EMPTY_CART":
      return {
        addedItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
