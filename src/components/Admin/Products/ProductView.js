import React from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import AdminLayout from "../AdminLayout";
import "../css/admin-style.css";

export const ProductView = () => {
  let { id } = useParams("id");
  return (
    <AdminLayout>
      <ProductInfo id={id} />
    </AdminLayout>
  );
};
