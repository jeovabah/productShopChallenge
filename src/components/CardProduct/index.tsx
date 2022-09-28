import React, { useState } from "react";
import { maskMoney } from "../../Utils";
import "./styles.scss";
export const CardProduct = ({ product, categories }: any) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = (product: any) => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const categoryFindIdAndReturnName = (id: any) => {
    const category = categories.find(
      (category: any) => Number(category.id) === Number(id)
    );
    if (category === undefined) {
      return "Sem categoria";
    } else {
      return category.name;
    }
  };
  return (
    <>
      <div className="product" onClick={() => handleModal(product)}>
        <div className="wrapperImg">
          <img src={product.link_url} alt={product.name} />
        </div>
        <div className="wrapperInfo">
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p>{maskMoney(product.price)}</p>
        </div>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modalContent">
            <div className="wrapperImg">
              <img src={product.link_url} alt={product.name} />
            </div>
            <div className="wrapperInfo">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>
                {product?.category_id
                  ? categoryFindIdAndReturnName(product?.category_id)
                  : "Sem Categoria"}
              </p>
              <p>{maskMoney(product.price)}</p>
            </div>
            <button onClick={handleModalClose}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
};
