import { Button, Input } from "antd";
import Search from "antd/lib/input/Search";
import { useCallback, useEffect } from "react";
import { Table } from "reactstrap";
import { useProduct } from "../../providers/Product";
import "./styles.scss";
export function Product() {
  const { products, getProducts, createProduct } = useProduct();
  // mask money
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const maskMoney = (value: string) => {
    return formatter.format(Number(value));
  };

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "description",
      title: "Descricao",
      dataIndex: "description",
    },
    {
      key: "price",
      title: "Preco",
      dataIndex: "price",
    },
    {
      key: "link_url",
      title: "Imagem",
      dataIndex: "link_url",
    },
    {
      key: "category_id",
      title: "Categoria",
      dataIndex: "category_id",
    },
    {
      key: "actions",
      title: "Acoes",
      dataIndex: "actions",
    },
  ];

  const newProduct = useCallback(async () => {
    await createProduct({
      name: "teste",
      description: "teste",
      price: 40,
      link_url: "https://cdn-icons-png.flaticon.com/512/2916/2916315.png",
      category_id: "1",
    });
  }, [createProduct]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <>
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
          <Button type="primary" onClick={newProduct}>
            Novo Produto
          </Button>
        </div>
        <div className="tableScroll">
          <Table className="table">
            <thead>
              <tr>
                {columns.map((column) => (
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
                    <td>{product.category_id}</td>
                    <td>
                      <div className="containerButton">
                        <Button type="primary">Editar</Button>
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
    </>
  );
}
