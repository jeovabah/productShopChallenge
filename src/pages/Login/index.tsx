import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";
import { FiMail, FiLock, FiEye } from "react-icons/fi";

import { useAuth } from "../../providers/Auth";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
export const Login = () => {
  const { signIn } = useAuth();

  const [formValidator, setFormValidator] = useState<any>({
    email: "",
    password: "",
  });
  const [revealPassword, setRevealPassword] = useState(false);

  function RevealPassword(event: any) {
    event.preventDefault();
    setRevealPassword(!revealPassword);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signIn(formValidator.email, formValidator.password);
  };

  return (
    // <div className={style.container} >
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="email">Email</label>
    //       <Input placeholder={"Email"} onChange={e => setFormValidator({
    //         ...formValidator,
    //         email: e.target.value,
    //       })} />
    //     </div>

    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <Input placeholder={"Password"} onChange={e => setFormValidator({
    //         ...formValidator,
    //         password: e.target.value,
    //       })} />

    //     </div>
    //     <div
    //     style={{
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         height: "100%",
    //         width: "100%"
    //       }}
    //       >
    //       <Button type="submit">Entrar</Button>
    //       </div>
    //   </form>
    // </div>
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <Input
            name="password"
            icon={FiMail}
            type="email"
            placeholder="E-mail"
            value={formValidator.email}
            onChange={(e) =>
              setFormValidator({
                ...formValidator,
                email: e.target.value,
              })
            }
          />
          <Input
            name="password"
            icon={FiLock}
            type={revealPassword ? "text" : "password"}
            placeholder="Senha"
            iconEye={FiEye}
            showPassword={RevealPassword}
            value={formValidator.password}
            onChange={(e) =>
              setFormValidator({
                ...formValidator,
                password: e.target.value,
              })
            }
          />
          <p>
            Cadastre-se <Link to={"/register"}>aqui</Link>
          </p>
          <Button type="submit">Login</Button>
        </form>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};
