import React from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";

const AdminDashboard = () => {
  return (
    <Layout title={"Admin Dashboard - Visitha Mobile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-4 shadow-sm border-0">
              <h3 className="fw-bold">Welcome, Admin</h3>
              <hr />
              <h5>Shop Name: Visitha Mobile</h5>
              <h5>Admin Email: admin@visitha.com</h5>
              <h5>Location: Sri Lanka</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;