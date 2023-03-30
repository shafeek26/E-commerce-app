export const productsReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        productsList: action.payload,
        isLoading: false,
      };
    case "Cart_PRODUCTS":
      return {
        ...state,
        cart: [...action.payload],
        isLoading: false,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload),
      };
    case "INCREASE_PRODUCT_QTY":
      const increaseQty = state.cart.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            qty: (product.qty += 1),
          };
        }
        return product;
      });
      console.log(increaseQty)
      return {
        ...state,
      };
    case "DECREASE_PRODUCT_QTY":
      const decreaseQty = state.cart.map((product) => {
        if (product.qty)
          if (product.id === action.payload) {
            return {
              ...product,
              qty: product.qty > 1 ? (product.qty -= 1) : product.qty,
            };
          }
        return product;
      });
      console.log(decreaseQty)
      return {
        ...state,
      };
    case 'SEARCH_PRODUCTS':
      return{
        ...state,
        searchProductsquerry : action.payload,
      }
    case 'CURRENT_PAGE':
      return{
        ...state,
        pageNumber:action.payload + 1
      }  
    case 'PREVIOUS_PAGE':
      return{
        ...state,
        pageNumber: (state.pageNumber === 1) ? 1 : (state.pageNumber -1)
      }
    case 'NEXT_PAGE':
      return{
        ...state,
        pageNumber : (state.pageNumber === state.productsList.length/10) ? state.pageNumber : state.pageNumber + 1
      }      
    default:
      return state;
  }
};
