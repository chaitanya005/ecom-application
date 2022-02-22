import React from "react";
import Category from "./Category";
import { Helmet } from "react-helmet";
import AdminLayout from "../AdminLayout";
import "../css/admin-style.css";

const CategoryLayout = () => {
  return (
    <>
      {/* <Helmet>
        <link rel="stylesheet" href="/css/style.css" />
      </Helmet> */}
      <AdminLayout>
        <Category />
      </AdminLayout>
    </>
  );
};

export default CategoryLayout;
