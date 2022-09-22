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
}

const CategoryContext = createContext({} as CategoryContextProps);
export const CategoryProvider = ({ children }: any) => {
  const [categories, setCategories] = useState([]);

  const getList = useCallback(async () => {
    try {
      const response = await CategoryService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
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
    async (id: string, data: any) => {
      try {
        await CategoryService.updateCategory(id, data);
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
