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

    default:
      return state;
  }
};

export default homepageReducer;
