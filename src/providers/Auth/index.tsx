import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api/api";
import { customToast } from "../../Utils/toast";
import { auth } from "./services";

interface AuthContextData {
  user?: any;
  signIn?: any;
  signed?: boolean;
  signOut?: any;
  registerAccount?: any;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const signed = !!user;

  const signIn = async (name: any, password: any) => {
    try {
      const response = await auth.login(name, password);
      setUser(response.data.user);
      localStorage.setItem("@auth:User", JSON.stringify(response.data.user));
      saveAuthToken(response.data.token);
      navigate("/home");
    } catch (error: any) {
      customToast(error.response.data.message, "error");
    }
  };

  const saveAuthToken = (token: any) => {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem("@auth:User");
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = "";
    navigate("/");
  };

  const loadingStoreData = useCallback(async () => {
    const user = localStorage.getItem("@auth:User");
    const token = localStorage.getItem("token");
    if (user && token) {
      saveAuthToken(token);
      setUser(JSON.parse(user));
    }
  }, []);

  //register Account
  const registerAccount = async (data: any) => {
    try {
      const response = await auth.register(data);
      console.log(response.data);
      navigate("/login");
    } catch (error: any) {
      customToast(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    loadingStoreData();
  }, [loadingStoreData]);
  return (
    <AuthContext.Provider
      value={{ signIn, user, signed, signOut, registerAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
