import productData from "../data";
const initialState = {
  products: productData
};
const homepageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        products: productData
      };

    case "GET_FILTERED_PRODUCTS":
      const size = action.payload.size;

      const price = action.payload.price;

      console.log(`Size : ${size} and Price: ${price}`);
      let filteredList = productData;
      if (size === "") {
        filteredList = productData.filter(item => item.price <= price);
      } else {
        filteredList = productData.filter(
          item => item.price <= price && item.size === size
        );
      }
      return {
        products: filteredList
      };

    // case "GET_PRODUCTS_BY_SIZE":
    //   const productListBySize = productData.filter(
    //     item => item.size === action.payload
    //   );
    //   //console.log(action.payload);
    //   return {
    //     products: productListBySize
    //   };
    // case "GET_PRODUCTS_BY_PRICE":
    //   const productListByPrice = productData.filter(
    //     item => item.price <= action.payload
    //   );
    //   //console.log(action.payload);
    //   return {
    //     products: productListByPrice
    //   };
    default:
      return state;
  }
};

export default homepageReducer;
