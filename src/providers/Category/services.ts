import { api } from "../../services/api/api";

export const CategoryService = {
  getCategories: () => {
    return api.get("/categories");
  },
  createCategory: (data: any) => {
    return api.post("/categories", data);
  },
  updateCategory: (id: string, data: any) => {
    return api.put(`/categories/${id}`, data);
  },
  searchCategory: (name: string) => {
    return api.get(`/categories/${name}`);
  },
  deleteCategory: (id: string) => {
    return api.delete(`/categories/${id}`);
  },
};
