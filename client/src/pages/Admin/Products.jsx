import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching inventory");
    }
  };

  // Lifecycle hook
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - All Products List"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="fw-bold mb-4">All Listed Inventory ({products.length})</h1>
            <div className="d-flex flex-wrap gap-3">
              {products?.map((p) => (
                <div className="card shadow-sm border-0" style={{ width: "16rem" }} key={p._id}>
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top p-2 rounded"
                    alt={p.name}
                    style={{ height: "180px", objectFit: "contain" }}
                  />
                  <div className="card-body bg-light rounded-bottom">
                    <h6 className="card-title fw-bold text-truncate">{p.name}</h6>
                    <p className="card-text text-primary small fw-bold mb-1">
                      LKR {p.price?.toLocaleString()}
                    </p>
                    <span className={`badge ${p.category === 'New' ? 'bg-success' : 'bg-warning text-dark'} mb-2`}>
                      {p.category}
                    </span>
                    <div className="text-muted small">Qty: {p.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;