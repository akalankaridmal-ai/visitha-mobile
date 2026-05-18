import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";

const CreateCategory = () => {
  return (
    <Layout title="Dashboard - Manage Categories">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"><AdminMenu /></div>
          <div className="col-md-9">
            <h1 className="fw-bold">Manage Categories</h1>
            <div className="card p-4 mt-3 bg-light border-0 shadow-sm">
              <p className="mb-0 text-muted">Category mapping manager context module.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CreateCategory;