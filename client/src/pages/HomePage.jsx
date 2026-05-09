import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/product/get-product');
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid mt-4 px-4">
        <div className="row">
          {/* --- SIDEBAR FILTERS --- */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-3 mb-4">
              <h5 className="fw-bold border-bottom pb-2 mb-3">Filter By</h5>
              
              <div className="mb-4">
                <h6 className="text-muted small fw-bold text-uppercase mb-3">Condition</h6>
                <div className="form-check my-2">
                  <input className="form-check-input" type="checkbox" id="brandNew" />
                  <label className="form-check-label" htmlFor="brandNew">Brand New</label>
                </div>
                <div className="form-check my-2">
                  <input className="form-check-input" type="checkbox" id="used" />
                  <label className="form-check-label" htmlFor="used">Used Mobiles</label>
                </div>
              </div>

              <div>
                <h6 className="text-muted small fw-bold text-uppercase mb-3">Brands</h6>
                <select className="form-select">
                  <option value="">All Brands</option>
                  <option value="apple">Apple</option>
                  <option value="samsung">Samsung</option>
                </select>
              </div>
            </div>
          </div>

          {/* --- PRODUCT LISTING --- */}
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold m-0">Latest Arrivals</h2>
              <span className="badge bg-dark px-3 py-2">{products.length} Products Found</span>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {products?.map((p) => (
                <div className="col" key={p._id}>
                  <div className="card h-100 shadow-sm border-0">
                    <div className="text-center rounded-top" style={{ height: "200px", overflow: "hidden", background: "#f8f9fa" }}>
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                        className="img-fluid h-100"
                        style={{ objectFit: "contain", padding: "20px" }}
                        alt={p.name}
                        onError={(e) => { 
                          e.target.src = "https://via.placeholder.com/200x200?text=No+Image"; 
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className="card-title fw-bold mb-1">{p.name}</h6>
                        <span className={`badge ${p.category === 'New' ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {p.category}
                        </span>
                      </div>
                      <p className="text-muted extra-small mb-2">{p.brand}</p>
                      <h5 className="text-primary fw-bold mb-3">LKR {p.price.toLocaleString()}</h5>
                      <button className="btn btn-dark w-100">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center mt-5 p-5 bg-light rounded">
                <p className="text-muted h4">No phones found. Try adding one via Postman!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;