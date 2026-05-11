import React from "react";
import Layout from "../components/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom"; // Added import

const SearchPage = () => {
  const [values] = useSearch();
  const navigate = useNavigate(); // Initialize navigate

  return (
    <Layout>
      <div className="container mt-4">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} products`}
          </h6>
          <div className="row mt-4">
            {values?.results.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{p.name}</h5>
                    <p className="card-text text-primary fw-bold">LKR {p.price.toLocaleString()}</p>
                    {/* Updated Button */}
                    <button 
                      className="btn btn-dark w-100" 
                      onClick={() => navigate(`/product/${p._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;