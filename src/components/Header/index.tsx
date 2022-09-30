import { Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuData } from "../../NavSideBar";
import { useAuth } from "../../providers/Auth";
import style from "./styles.module.scss";

interface Props {
  routeProtected: boolean;
  collapsed: boolean;
}

export const Header = ({ routeProtected, collapsed }: Props) => {
  const { signOut } = useAuth();
  if (routeProtected) {
    return (
      <header className={style.containerHeader}>
        <nav className={style.containerNav}>
          {MenuData.map((nav) => {
            return (
              <NavLink
                key={nav.id}
                to={nav.to}
                className={({ isActive }) =>
                  isActive ? style.active : style.inactive
                }
              >
                {collapsed ? nav.icon : nav.title}
              </NavLink>
            );
          })}
        </nav>
        <div className={style.containerButton}>
          <Button
            type="primary"
            danger
            className={style.buttonLogout}
            onClick={signOut}
          >
            Sair
          </Button>
        </div>
      </header>
    );
  }
  return (
    <header className={style.containerHeader}>
      <nav className={style.containerNav}>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? style.active : style.inactive
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
};
