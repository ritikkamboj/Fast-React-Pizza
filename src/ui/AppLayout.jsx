import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <h1>Content </h1>
        <p>------------------------------------</p>
        <Outlet />
        <p>---------------------------------------</p>
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
