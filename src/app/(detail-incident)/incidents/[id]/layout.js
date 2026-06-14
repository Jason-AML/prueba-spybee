import { Layout } from "@/app/components/layouts/Layout";
import React from "react";

const layout = ({ children }) => {
  return <Layout pageTitle="Detalle">{children}</Layout>;
};

export default layout;
