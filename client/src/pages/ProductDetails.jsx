import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // 1. Get main Product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.id}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  // 2. Fetch related items
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Initial load: Fetch product when ID changes
  useEffect(() => {
    if (params?.id) {
        getProduct();
        window.scrollTo(0, 0); // Scroll to top when moving between products
    }
  }, [params?.id]);

  // Secondary load: Fetch similar products once main product state is ready
  useEffect(() => {
    if (product?._id && product?.category) {
      getSimilarProduct(product._id, product.category._id || product.category);
    }
  }, [product]);

  useEffect(() => {
    // Only call the API if params.id actually exists and isn't "undefined"
    if (params?.id && params.id !== "undefined") {
        getProduct();
    }
}, [params?.id]);

  return (
    <Layout>
      <div className="container mt-5">
        {/* --- MAIN PRODUCT DETAILS --- */}
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
              className="img-fluid rounded shadow"
              alt={product.name}
              style={{ maxHeight: "500px" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="fw-bold">{product.name}</h1>
            <hr />
            <h4 className="text-primary fw-bold">LKR {product.price?.toLocaleString()}</h4>
            <div className="my-3">
              <span className="badge p-2 bg-info text-dark">
                {product.category?.name || "Category"}
              </span>
              <span className="ms-2 text-muted">Brand: {product.brand}</span>
            </div>
            <h5>Description:</h5>
            <p className="text-secondary">{product.description}</p>
            <button className="btn btn-dark btn-lg w-100 mt-4">Add to Cart</button>
          </div>
        </div>

        {/* --- SIMILAR PRODUCTS SECTION (Updated with your UI) --- */}
        <hr />
        <div className="row container mt-3">
          <h5 className="fw-bold mb-4">Similar Products You Might Like</h5>
          {relatedProducts.length < 1 && (
            <p className="text-center text-muted">No similar products found.</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "contain", padding: "10px" }}
                />
                <div className="card-body">
                  <h6 className="card-title fw-bold">{p.name}</h6>
                  <p className="card-text text-primary">LKR {p.price.toLocaleString()}</p>
                  <button 
                    className="btn btn-outline-dark btn-sm w-100"
                    onClick={() => navigate(`/product/${p._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;