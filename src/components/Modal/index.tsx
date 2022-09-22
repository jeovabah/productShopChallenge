import { Button, Modal } from "antd";
import React, { useState } from "react";

const ModalComponent = ({
  children,
  setOpen,
  open,
  onClick,
  title,
  setProduct,
}: any) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    await onClick();
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setProduct({
      name: "",
      description: "",
      price: "",
      link_url: "",
      category_id: "",
    });
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
