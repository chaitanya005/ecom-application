import React from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { EditForm } from "./EditForm";
import "../css/admin-style.css";

export const Edit = () => {
  let { id } = useParams("id");
  return (
    <AdminLayout>
      <EditForm id={id} />
    </AdminLayout>
  );
};
