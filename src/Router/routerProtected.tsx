import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { LayoutComponent } from "../components/Layout";
import { Category } from "../pages/Category";
import Home from "../pages/Home";
import { Page404 } from "../pages/Page404";
import { Product } from "../pages/Product";

export const RouterProtected = () => {
  return (
    <>
      {/* <Header routeProtected={true} /> */}
      <LayoutComponent>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/categories" element={<Category />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </LayoutComponent>
    </>
  );
};
