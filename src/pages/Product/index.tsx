import { Button, Input, Select } from "antd";
import Search from "antd/lib/input/Search";
import { useCallback, useEffect, useRef, useState } from "react";
import { Table } from "reactstrap";
import { LoadingComponent } from "../../components/LoadingComponent";
import ModalComponent from "../../components/Modal";
import { useCategory } from "../../providers/Category";
import { useProduct } from "../../providers/Product";
import { columnsTableProduct, maskMoney } from "../../Utils";
import { customToast } from "../../Utils/toast";
import "./styles.scss";
export function Product() {
  const { products, getProducts, createProduct, loading, updateProduct } =
    useProduct();
  const { getList, categories } = useCategory();
  const refUnicLoad = useRef(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    link_url: "",
    category_id: "",
  });

  const newProduct = useCallback(async () => {
    if (
      product.name &&
      product.description &&
      product.price &&
      product.link_url &&
      product.category_id
    ) {
      await createProduct(product);
      setModalOpen(false);
      setProduct({
        name: "",
        description: "",
        price: "",
        link_url: "",
        category_id: "",
      });
    } else {
      return customToast("Preencha todos os campos", "error");
    }
  }, [createProduct, product]);

  const putProduct = useCallback(async () => {
    if (
      product.name &&
      product.description &&
      product.price &&
      product.link_url &&
      product.category_id
    ) {
      await updateProduct(product);
      setModalEdit(false);
      setProduct({
        name: "",
        description: "",
        price: "",
        link_url: "",
        category_id: "",
      });
    } else {
      return customToast("Preencha todos os campos", "error");
    }
  }, [product, updateProduct]);

  const openModalCreate = useCallback(() => {
    setModalOpen(true);
  }, []);

  useEffect(() => {
    if (!refUnicLoad.current) {
      getProducts();
      getList();
      refUnicLoad.current = true;
    }
  }, [getList, getProducts]);

  const handleModalEdit = useCallback((product: any) => {
    setProduct(product);
    setModalEdit(true);
  }, []);
  return (
    <>
      {(products.length === 0 || loading) && <LoadingComponent />}
      <div className="wrapperTable">
        <div className="wrapperHeader">
          <h1>Produtos</h1>
          <div className="wrapperSearch">
            <Search
              placeholder="Pesquisar"
              onSearch={(value) => console.log(value)}
              style={{ width: 250 }}
            />
          </div>
          <Button type="primary" onClick={openModalCreate}>
            Novo Produto
          </Button>
        </div>
        <div className="tableScroll">
          <Table className="table">
            <thead>
              <tr>
                {columnsTableProduct.map((column) => (
                  <th key={column.key}>{column.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product: any) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{maskMoney(product.price)}</td>
                    <td>
                      <img
                        className="imgProduct"
                        src={product.link_url}
                        alt={product.name}
                      />
                    </td>
                    <td>
                      {
                        categories.find(
                          (category: any) =>
                            category.id === Number(product.category_id)
                        )?.name
                      }
                    </td>
                    <td>
                      <div className="containerButton">
                        <Button
                          type="primary"
                          onClick={() => handleModalEdit(product)}
                        >
                          Editar
                        </Button>
                        <Button type="primary" style={{ background: "#902" }}>
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
      {/* Modal Create */}
      <ModalComponent
        setOpen={setModalOpen}
        open={modalOpen}
        title={"Criar Produto"}
        onClick={newProduct}
        setProduct={setProduct}
      >
        <div className="wrapperModal">
          <div className="wrapperInput">
            <Input
              placeholder="Nome"
              value={product.name}
              onChange={(e) =>
                setProduct({
                  ...product,
                  name: e.target.value,
                })
              }
            />
            <Input
              placeholder="Descricao"
              value={product.description}
              onChange={(e) =>
                setProduct({
                  ...product,
                  description: e.target.value,
                })
              }
            />
            <Input
              placeholder="Preco"
              value={product.price}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: e.target.value,
                })
              }
            />
            <Input
              placeholder="Imagem"
              value={product.link_url}
              onChange={(e) =>
                setProduct({
                  ...product,
                  link_url: e.target.value,
                })
              }
            />
            <select
              value={product.category_id}
              onChange={(e) =>
                setProduct({
                  ...product,
                  category_id: e.target.value,
                })
              }
            >
              <option value={""}>Selecione uma categoria</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </ModalComponent>

      {/* Modal Edit */}
      <ModalComponent
        setOpen={setModalEdit}
        open={modalEdit}
        title={"Editar Produto"}
        onClick={putProduct}
        setProduct={setProduct}
      >
        <div className="wrapperModal">
          <div className="wrapperInput">
            <Input
              placeholder="Nome"
              value={product.name}
              onChange={(e) =>
                setProduct({
                  ...product,
                  name: e.target.value,
                })
              }
            />
            <Input
              placeholder="Descricao"
              value={product.description}
              onChange={(e) =>
                setProduct({
                  ...product,
                  description: e.target.value,
                })
              }
            />
            <Input
              placeholder="Preco"
              value={product.price}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: e.target.value,
                })
              }
            />
            <Input
              placeholder="Imagem"
              value={product.link_url}
              onChange={(e) =>
                setProduct({
                  ...product,
                  link_url: e.target.value,
                })
              }
            />
            <select
              value={product.category_id}
              onChange={(e) =>
                setProduct({
                  ...product,
                  category_id: e.target.value,
                })
              }
            >
              <option value={""}>Selecione uma categoria</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </ModalComponent>
    </>
  );
}
