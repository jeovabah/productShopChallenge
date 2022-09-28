import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CategoryService } from "./services";

interface CategoryContextProps {
  categories?: any;
  getList?: any;
  getCategoryDetails?: any;
  createCategory?: any;
  updateCategory?: any;
  deleteCategory?: any;
  loading: boolean;
}

const CategoryContext = createContext({} as CategoryContextProps);
export const CategoryProvider = ({ children }: any) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const getList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await CategoryService.getCategories();
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(
    async (data: any) => {
      try {
        await CategoryService.createCategory(data);
        getList();
      } catch (error) {
        console.log(error);
      }
    },
    [getList]
  );

  const updateCategory = useCallback(
    async (data: any) => {
      try {
        await CategoryService.updateCategory(data);
        getList();
      } catch (error) {
        console.log(error);
      }
    },
    [getList]
  );

  const deleteCategory = useCallback(
    async (id: string) => {
      try {
        await CategoryService.deleteCategory(id);
        getList();
      } catch (error) {
        console.log(error);
      }
    },
    [getList]
  );

  return (
    <CategoryContext.Provider
      value={{
        getList,
        categories,
        createCategory,
        updateCategory,
        deleteCategory,
        loading,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  return context;
};
