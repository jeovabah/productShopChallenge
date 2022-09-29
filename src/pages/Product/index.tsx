import { Button, Input, Select, Switch } from "antd";
import Search from "antd/lib/input/Search";
import { useCallback, useEffect, useRef, useState } from "react";
import { Table } from "reactstrap";
import { LoadingComponent } from "../../components/LoadingComponent";
import ModalComponent from "../../components/Modal";
import { Spinner } from "../../components/Spinner";
import { useCategory } from "../../providers/Category";
import { useProduct } from "../../providers/Product";
import { columnsTableProduct, maskMoney } from "../../Utils";
import { customToast } from "../../Utils/toast";
import "./styles.scss";
export function Product() {
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    link_url: "",
    category_id: "",
    id: "",
    is_active: true,
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
        id: "",
        is_active: true,
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
        id: "",
        is_active: true,
      });
    } else {
      return customToast("Preencha todos os campos", "error");
    }
  }, [product, updateProduct]);

  const deleteInProduct = useCallback(
    async (id: any) => {
      await deleteProduct(id);
      setModalDelete(false);
      getProducts();
    },
    [deleteProduct, getProducts]
  );

  const openModalCreate = useCallback(() => {
    setModalOpen(true);
  }, []);

  useEffect(() => {
    if (!refUnicLoad.current) {
      setLoadingInitial(true);
      getList();
      setLoadingInitial(false);
      refUnicLoad.current = true;
    }
  }, [getList]);

  const getListProducts = useCallback(async () => {
    await getProducts(search);
  }, [getProducts, search]);

  useEffect(() => {
    getListProducts();
  }, [getListProducts]);

  const openModalEdit = useCallback((product: any) => {
    setProduct(product);
    setModalEdit(true);
  }, []);

  const openModalDelete = useCallback((product: any) => {
    setProduct(product);
    setModalDelete(true);
  }, []);
  return (
    <>
      {loadingInitial && <LoadingComponent />}
      <div className="wrapperTable">
        <div className="wrapperHeader">
          <h1>Produtos</h1>
          <div className="wrapperSearch">
            <Search
              placeholder="Pesquisar"
              onSearch={(value) => setSearch(value)}
              style={{ width: 250 }}
            />
          </div>
          <Button type="primary" onClick={openModalCreate}>
            Novo Produto
          </Button>
        </div>
        <div style={{ textAlign: "center", height: "40px" }}>
          {" "}
          {loading && <Spinner />}{" "}
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
                      {categories.find(
                        (category: any) =>
                          category.id === Number(product.category_id)
                      )?.name ?? "Sem Categoria"}
                    </td>
                    <td>
                      <div className="containerButton">
                        <Button
                          type="primary"
                          onClick={() => openModalEdit(product)}
                        >
                          Editar
                        </Button>
                        <Button
                          type="primary"
                          style={{ background: "#902" }}
                          onClick={() => openModalDelete(product)}
                        >
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
              type="number"
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
          <Switch
            checkedChildren="Produto Ativo"
            unCheckedChildren="Produto Inativo"
            checked={product.is_active}
            onChange={(checked) =>
              setProduct({
                ...product,
                is_active: checked,
              })
            }
          />
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
          <Switch
            checkedChildren="Produto Ativo"
            unCheckedChildren="Produto Inativo"
            checked={product.is_active}
            onChange={(checked) =>
              setProduct({
                ...product,
                is_active: checked,
              })
            }
          />
        </div>
      </ModalComponent>

      {/* Modal Excluir */}
      <ModalComponent
        setOpen={setModalDelete}
        open={modalDelete}
        title={"Excluir Produto " + '"' + product.name + '"'}
        onClick={() => deleteInProduct(product.id)}
        setProduct={setProduct}
      >
        <div className="wrapperModal">
          <div className="wrapperInput">
            <p>Tem certeza que deseja excluir o produto {product.name} ? </p>
          </div>
        </div>
      </ModalComponent>
    </>
  );
}
