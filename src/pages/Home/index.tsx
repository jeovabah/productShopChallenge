import { useCallback, useEffect, useRef, useState } from "react";
import { useCategory } from "../../providers/Category";
import Search from "antd/lib/input/Search";

import { useProduct } from "../../providers/Product";
import "./styles.scss";
import { CardProduct } from "../../components/CardProduct";
import { Select } from "antd";
import { LoadingComponent } from "../../components/LoadingComponent";
import { Spinner } from "../../components/Spinner";
export default function Home() {
  const {
    products,
    getProducts,
    createProduct,
    loading,
    updateProduct,
    deleteProduct,
  } = useProduct();
  const { getList, categories } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const refUnicLoad = useRef(false);
  useEffect(() => {
    if (!refUnicLoad.current) {
      getList();
      refUnicLoad.current = true;
    }
  }, [getList, selectedCategory]);

  const getListProducts = useCallback(async () => {
    await getProducts(search, selectedCategory);
  }, [getProducts, search, selectedCategory]);

  useEffect(() => {
    getListProducts();
  }, [getListProducts]);

  const productFilterIsActive = products.filter((product: any) => {
    return product.is_active === 1;
  });
  return (
    <>
      <div className="containerProduct">
        <div className="wrapperHeader">
          <h1>Produtos</h1>
          <Select
            style={{ width: 200 }}
            onChange={(value) => setSelectedCategory(value)}
            value={selectedCategory}
          >
            <Select.Option value={""}>Todos</Select.Option>
            {categories.map((category: any, index: number) => (
              <Select.Option key={index} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>

          <div className="wrapperSearch">
            <Search
              placeholder="Pesquisar"
              onSearch={(value) => setSearch(value)}
              style={{ width: 250 }}
            />
          </div>
        </div>
        <div style={{ textAlign: "center", height: "10px" }}>
          {" "}
          {loading && <Spinner />}{" "}
        </div>

        <div className="products">
          {products.length > 0 &&
            productFilterIsActive.map((product: any) => (
              <CardProduct
                key={product.id}
                product={product}
                categories={categories}
              />
            ))}
        </div>
      </div>
    </>
  );
}
