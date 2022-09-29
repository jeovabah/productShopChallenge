import { api } from "../../services/api/api";

export const CategoryService = {
  getCategories: (search: string = "") => {
    return api.get(`categories?search=${search}`);
  },
  createCategory: (data: any) => {
    return api.post("categories", {
      name: data.name,
    });
  },
  updateCategory: (data: any) => {
    return api.put(`categories/${data.id}`, {
      name: data.name,
    });
  },
  searchCategory: (name: string) => {
    return api.get(`categories/${name}`);
  },
  deleteCategory: (id: string) => {
    return api.delete(`categories/${id}`);
  },
};
