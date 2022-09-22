import { AuthProvider } from "./Auth";
import { CategoryProvider } from "./Category";
import { ProductProvider } from "./Product";

export const Providers = ({ children }: any) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CategoryProvider>{children}</CategoryProvider>
      </ProductProvider>
    </AuthProvider>
  );
};
