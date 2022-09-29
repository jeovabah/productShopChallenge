import { api } from "../../services/api/api";

export const ProductService = {
  get: (name: string = "", category_id: string = "") => {
    return api.get(`products?search=${name}&category_id=${category_id}`);
  },
  getDetails: (id: string) => {
    return api.get(`product/${id}`);
  },
  create: (data: any) => {
    return api.post(`products`, {
      name: data.name,
      description: data.description,
      price: data.price.replace(",", "."),
      link_url: data.link_url,
      category_id: String(data.category_id),
      is_active: data.is_active,
    });
  },
  update: (data: any) => {
    return api.put(`products/${data.id}`, {
      name: data.name,
      description: data.description,
      price: data.price.replace(",", "."),
      link_url: data.link_url,
      category_id: data.category_id,
      is_active: data.is_active ? 1 : 0,
    });
  },
  delete: (id: string) => {
    return api.delete(`products/${id}`);
  },
};
