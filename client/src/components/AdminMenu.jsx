import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group shadow-sm">
        <h4 className="bg-dark text-white p-3 mb-0">Admin Panel</h4>
        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action py-3">
          Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action py-3">
          Add New Phone
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action py-3">
          Manage Inventory
        </NavLink>
        <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action py-3">
          View Orders
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;