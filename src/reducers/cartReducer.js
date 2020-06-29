const initialState = {
  addedItems: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        //...state,
        addedItems: [
          ...state.addedItems,
          { product: action.payload, quantity: 1 },
        ],
      };

    // case "REMOVE_FROM_CART":
    //   const updatedCart = state.addedItems.filter(
    //     (item) => item.product.id !== action.payload.id
    //   );
    //   return {
    //     addedItems: updatedCart,
    //   };

    case "INCREASE_QUANTITY":
      const newCartInc = state.addedItems.map((item) => {
        if (item.product.id === action.payload.id)
          return { product: action.payload, quantity: item.quantity + 1 };
        else return item;
      });

      return {
        addedItems: [
          // { product: action.payload, quantity: newQuantityInc },
          ...newCartInc,
        ],
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
        addedItems: [
          // { product: action.payload, quantity: newQuantityInc },
          ...newCartDec,
        ],
      };

    default:
      return state;
  }
};

export default cartReducer;

// let newQuantityDec = 0;
// for (let item of state.addedItems) {
//   if (item.product.id === action.payload.id) {
//     newQuantityDec = item.quantity - 1;
//   }
// }
// const newCartDec = state.addedItems.map((item) => {
//   if (item.product.id === prodID)
//     return { product: action.payload, quantity: item.quantity - 1 };
//   else return item;
// });

// if (newQuantityDec > 0) {
//   return {
//     addedItems: [
//       { product: action.payload, quantity: newQuantityDec },
//       ...newCartDec,
//     ],
//   };
// } else {
//   return {
//     addedItems: newCartDec,
//   };
// }
