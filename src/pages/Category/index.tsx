import { Button, Input } from "antd";
import Search from "antd/lib/input/Search";
import { useCallback, useEffect, useRef, useState } from "react";
import { Table } from "reactstrap";
import { CardCategory } from "../../components/CardCategory";
import { LoadingComponent } from "../../components/LoadingComponent";
import ModalComponent from "../../components/Modal";
import { Spinner } from "../../components/Spinner";
import { useCategory } from "../../providers/Category";
import { useProduct } from "../../providers/Product";
import { columnsTableProduct, maskMoney } from "../../Utils";
import { customToast } from "../../Utils/toast";
import "./styles.scss";
export function Category() {
  const {
    getList,
    categories,
    createCategory,
    deleteCategory,
    updateCategory,
    loading,
  } = useCategory();
  const refUnicLoad = useRef(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    id: "",
  });

  const newCategory = useCallback(async () => {
    if (product.name) {
      await createCategory(product);
      setModalOpen(false);
      setProduct({
        name: "",
        id: "",
      });
    } else {
      return customToast("Preencha todos os campos", "error");
    }
  }, [createCategory, product]);

  const putCategory = useCallback(async () => {
    if (product.name) {
      await updateCategory(product);
      setModalEdit(false);
      setProduct({
        name: "",
        id: "",
      });
    } else {
      return customToast("Preencha todos os campos", "error");
    }
  }, [product, updateCategory]);

  const deleteInCategory = useCallback(
    async (id: any) => {
      await deleteCategory(id);
      setModalDelete(false);
      getList();
    },
    [deleteCategory, getList]
  );

  const openModalCreate = useCallback(() => {
    setModalOpen(true);
  }, []);

  useEffect(() => {
    if (!refUnicLoad.current) {
      getList();
      refUnicLoad.current = true;
    }
  }, [getList]);

  const openModalEdit = useCallback((product: any) => {
    setProduct(product);
    setModalEdit(true);
  }, []);

  const openModalDelete = useCallback((product: any) => {
    setProduct(product);
    setModalDelete(true);
  }, []);

  const onSearch = useCallback(
    async (e: any) => {
      setSpinner(true);
      await getList(e);
      setSpinner(false);
    },
    [getList]
  );
  return (
    <>
      {loading && !refUnicLoad.current && <LoadingComponent />}
      <div className="wrapperTable">
        <div className="wrapperHeader">
          <h1>Categorias</h1>
          <div className="wrapperSearch">
            <Search
              placeholder="Pesquisar"
              onSearch={(value) => onSearch(value)}
              style={{ width: 250 }}
            />
          </div>
          <Button type="primary" onClick={openModalCreate}>
            Nova Categoria
          </Button>
        </div>
        <div style={{ textAlign: "center", height: "40px" }}>
          {" "}
          {spinner && <Spinner />}{" "}
        </div>
        <div className="cards">
          <div className="thead">
            <div className="th">Titulo</div>
            <div className="th">Acoes</div>
          </div>
          {categories.length > 0 &&
            categories.map((product: any, index: number) => {
              return (
                <CardCategory
                  key={index}
                  product={product}
                  openModalEdit={openModalEdit}
                  openModalDelete={openModalDelete}
                />
              );
            })}
        </div>
      </div>
      {/* Modal Create */}
      <ModalComponent
        setOpen={setModalOpen}
        open={modalOpen}
        title={"Criar Categoria"}
        onClick={newCategory}
        setProduct={setProduct}
      >
        <div className="wrapperModal">
          <div className="wrapperInput">
            <Input
              placeholder="Titulo"
              value={product.name}
              onChange={(e) =>
                setProduct({
                  ...product,
                  name: e.target.value,
                })
              }
            />
          </div>
        </div>
      </ModalComponent>

      {/* Modal Edit */}
      <ModalComponent
        setOpen={setModalEdit}
        open={modalEdit}
        title={"Editar Categoria"}
        onClick={putCategory}
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
          </div>
        </div>
      </ModalComponent>

      {/* Modal Delete */}
      <ModalComponent
        setOpen={setModalDelete}
        open={modalDelete}
        title={"Excluir Categoria " + '"' + product.name + '"'}
        onClick={() => deleteInCategory(product.id)}
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
