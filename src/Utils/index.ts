const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
export const maskMoney = (value: string) => {
  return formatter.format(Number(value));
};

export const columnsTableProduct = [
  {
    key: "name",
    title: "Produto",
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
