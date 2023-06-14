import React from "react";
import { publicRoutes } from "./public";
import { useRoutes } from "react-router-dom";

// for now - only public routes
export const AppRoutes = () => {
  const routes = publicRoutes;
  const element = useRoutes([...routes]);
  return <>{element}</>;
};

export default AppRoutes;
