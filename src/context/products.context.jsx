import { useEffect, useState } from "react";
import { createContext } from "react";
import { getCollectionsAndDocuments } from "../utils/firebase/firebase.utils.js";
import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext({
  products: [],
  setProducts: () => null
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = {products};

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryMap = await getCollectionsAndDocuments();
      console.log(categoryMap);
    };

    getCategoryMap();
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}