import { BiHomeAlt } from "react-icons/bi";
import { MdShopTwo } from "react-icons/md";
import { TbNewSection } from "react-icons/tb";
export const MenuData = [
  {
    to: `/home`,
    id: 1,
    title: `Home`,
    icon: <BiHomeAlt />,
  },
  {
    to: `/products`,
    id: 2,
    title: `Produtos`,
    icon: <MdShopTwo />,
  },
  {
    to: `/categories`,
    id: 3,
    title: `Categorias`,
    icon: <TbNewSection />,
  },
];
