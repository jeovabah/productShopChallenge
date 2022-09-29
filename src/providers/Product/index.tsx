import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { customToast } from "../../Utils/toast";
import { ProductService } from "./services";

interface ProductContextProps {
  products?: any;
  getProducts?: any;
  getProductDetails?: any;
  createProduct?: any;
  updateProduct?: any;
  deleteProduct?: any;
  loading?: boolean;
}

const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const getProducts = useCallback(async (name: string, category_id: string) => {
    setLoading(true);
    try {
      const response = await ProductService.get(name, category_id);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
        customToast("Produto cadastrado com Sucesso!", "success");
        getProducts("", "");
        return response.data;
      } catch (error: any) {
        return customToast(error.response.data.message, "error");
      }
    },
    [getProducts]
  );

  const updateProduct = useCallback(
    async (data: any) => {
      try {
        const response = await ProductService.update(data);
        getProducts("", "");
        customToast("Produto atualizado com Sucesso!", "success");
        return response.data;
      } catch (error: any) {
        return customToast(error.response.data.message, "error");
      }
    },
    [getProducts]
  );

  const deleteProduct = useCallback(
    async (id: any) => {
      try {
        const response = await ProductService.delete(id);
        customToast("Produto deletado com Sucesso!", "success");
        getProducts("", "");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    [getProducts]
  );

  return (
    <ProductContext.Provider
      value={{
        getProducts,
        getProductDetails,
        createProduct,
        deleteProduct,
        updateProduct,
        products,
        loading,
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
