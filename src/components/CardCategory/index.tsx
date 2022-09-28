import { Button } from "antd";
import React from "react";
import "./styles.scss";
interface Props {
  product?: any;
  openModalEdit?: any;
  openModalDelete?: any;
}
export const CardCategory = ({
  product,
  openModalEdit,
  openModalDelete,
}: Props) => {
  return (
    <>
      <div className="wrapperCard">
        <div className="title">
          <h4>{product?.name}</h4>
        </div>
        <div className="actions">
          <Button type="primary" onClick={() => openModalEdit(product)}>
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
      </div>
    </>
  );
};
