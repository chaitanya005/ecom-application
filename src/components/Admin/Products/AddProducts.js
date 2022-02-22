import React, { PureComponent } from "react";
import AddForm from "./AddForm";
import "../css/admin-style.css";
import AdminLayout from "../AdminLayout";
function AddProducts() {
  return (
    <AdminLayout>
      <AddForm />
    </AdminLayout>
  );
}

export default AddProducts;
