import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";
import { Input } from "../../components/Button/Input";
import { useAuth } from "../../providers/Auth";
import { api } from "../../services/api/api";
import style from "./styles.module.scss";
export const Login = () => {
  const { signIn } = useAuth();

  const [formValidator, setFormValidator] = useState<any>({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signIn(formValidator.email, formValidator.password);  
  }

  return (
    <div className={style.container} >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <Input placeholder={"Email"} onChange={e => setFormValidator({
            ...formValidator,
            email: e.target.value,
          })} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Input placeholder={"Password"} onChange={e => setFormValidator({
            ...formValidator,
            password: e.target.value,
          })} />

        </div>
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%"
          }}
          >
          <Button type="submit">Entrar</Button>
          </div>
      </form>
    </div>
  );
};
