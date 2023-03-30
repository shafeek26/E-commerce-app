import { useContext, createContext, useEffect, useReducer } from "react";
import { productsReducer } from "./productsReducer";
// import { db } from "../firebase/firebase.config";

const Products = createContext();

let initialState = {
  productsList: [],
  cart: [],
  isLoading: true,
  searchProductsquerry : '',
  pageNumber : 3
};
const ProductContext = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  // fething all products from API
  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      dispatch({
        type: "FETCH_PRODUCTS",
        payload: data.products,
      });
    };
    fetchAllProducts();
  }, []);


    
  return (
    <Products.Provider value={{ ...state, dispatch }}>
      {children}
    </Products.Provider>
  );
};

export default ProductContext;

export const useProductsState = () => {
  return useContext(Products);
};
