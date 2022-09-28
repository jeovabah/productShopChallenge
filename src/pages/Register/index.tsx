import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi";

import { useAuth } from "../../providers/Auth";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { customToast } from "../../Utils/toast";
import { LoadingComponent } from "../../components/LoadingComponent";
export const Register = () => {
  const { registerAccount } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formValidator, setFormValidator] = useState<any>({
    email: "",
    password: "",
    name: "",
    passwordConfirmation: "",
  });
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealPasswordConfirmation, setRevealPasswordConfirmation] =
    useState(false);

  function RevealPassword(event: any) {
    event.preventDefault();
    setRevealPassword(!revealPassword);
  }

  function RevealPasswordConfirmation(event: any) {
    event.preventDefault();
    setRevealPasswordConfirmation(!revealPasswordConfirmation);
  }

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (formValidator.password !== formValidator.passwordConfirmation) {
      setLoading(false);
      customToast("Senhas não conferem", "error");
      return;
    }
    if (formValidator.password.length < 6) {
      setLoading(false);

      customToast("Senha deve ter no mínimo 6 caracteres", "error");
      return;
    }
    if (formValidator.name.length < 3) {
      setLoading(false);

      customToast("Nome deve ter no mínimo 3 caracteres", "error");
      return;
    }
    await registerAccount(formValidator);
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingComponent />}
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <Input
              name="nome"
              icon={FiUser}
              type="text"
              placeholder="Nome"
              value={formValidator.name}
              onChange={(e) =>
                setFormValidator({
                  ...formValidator,
                  name: e.target.value,
                })
              }
            />
            <Input
              name="email"
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
              iconEye={revealPassword ? FiEyeOff : FiEye}
              showPassword={RevealPassword}
              value={formValidator.password}
              onChange={(e) =>
                setFormValidator({
                  ...formValidator,
                  password: e.target.value,
                })
              }
            />
            <Input
              name="password"
              icon={FiLock}
              type={revealPasswordConfirmation ? "text" : "password"}
              placeholder="Confirmar Senha"
              iconEye={revealPasswordConfirmation ? FiEyeOff : FiEye}
              showPassword={RevealPasswordConfirmation}
              value={formValidator.passwordConfirmation}
              onChange={(e) =>
                setFormValidator({
                  ...formValidator,
                  passwordConfirmation: e.target.value,
                })
              }
            />
            <Button type="submit">Cadastrar</Button>
          </form>
        </div>
        <div className={styles.background}></div>
      </div>
    </>
  );
};
