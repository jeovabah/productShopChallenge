import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { customToast } from "../../Utils/toast";
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
  const getList = useCallback(async (search: string) => {
    setLoading(true);
    try {
      const response = await CategoryService.getCategories(search);
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
        getList("");
        customToast("Categoria criada com sucesso", "success");
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
        getList("");
        customToast("Categoria Atualizada com sucesso", "success");
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
        getList("");
        customToast("Categoria Removida com sucesso", "success");
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
