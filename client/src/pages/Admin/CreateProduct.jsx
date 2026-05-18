import React, { useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(""); // 1. Added quantity state variable
  const [photo, setPhoto] = useState("");

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("brand", brand);
      productData.append("quantity", quantity); // 2. Appended quantity string to payload
      productData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/"); // Redirecting to Home to verify your listing instantly
      } else {
        toast.error(data?.message || "Failed to list item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="fw-bold">Add New Phone</h1>
            <div className="m-1 w-75">
              {/* PHOTO UPLOAD */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3 text-center">
                {photo && (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive rounded shadow-sm"
                  />
                )}
              </div>

              {/* INPUT FIELDS */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Phone Name (e.g. iPhone 15 Pro)"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Enter specs and condition..."
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Price in LKR"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* 3. NEW QUANTITY INPUT BOX */}
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Quantity (e.g. 1)"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <select
                  className="form-select"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Condition</option>
                  <option value="New">Brand New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={brand}
                  placeholder="Brand (e.g. Samsung, Apple)"
                  className="form-control"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary w-100 fw-bold" onClick={handleCreate}>
                  LIST PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;