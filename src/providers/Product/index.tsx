import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProductService } from "./services";

interface ProductContextProps {
  products?: any;
  getProducts?: any;
  getProductDetails?: any;
  createProduct?: any;
  updateProduct?: any;
  deleteProduct?: any;
}

const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const getProducts = useCallback(async () => {
    try {
      const response = await ProductService.get();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getProductDetails = useCallback(async (id: any) => {
    try {
      const response = await ProductService.getDetails(id);
      setProduct(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createProduct = useCallback(
    async (data: any) => {
      try {
        const response = await ProductService.create(data);
        getProducts();
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    [getProducts]
  );

  const updateProduct = useCallback(async (data: any) => {
    try {
      const response = await ProductService.update(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteProduct = useCallback(async (id: any) => {
    try {
      const response = await ProductService.delete(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        getProducts,
        getProductDetails,
        createProduct,
        deleteProduct,
        updateProduct,
        products,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  return context;
};
