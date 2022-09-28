import { useEffect, useRef } from "react";
import { useCategory } from "../../providers/Category";
import Search from "antd/lib/input/Search";

import { useProduct } from "../../providers/Product";
import "./styles.scss";
import { CardProduct } from "../../components/CardProduct";
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
  const refUnicLoad = useRef(false);
  useEffect(() => {
    if (!refUnicLoad.current) {
      getProducts();
      getList();
      refUnicLoad.current = true;
    }
  }, [getList, getProducts]);
  return (
    <>
      <div className="containerProduct">
        <div className="wrapperHeader">
          <h1>Produtos</h1>
          <div className="wrapperSearch">
            <Search
              placeholder="Pesquisar"
              onSearch={(value) => console.log(value)}
              style={{ width: 250 }}
            />
          </div>
        </div>
        <div className="products">
          {products.length > 0 &&
            products.map((product: any) => (
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
