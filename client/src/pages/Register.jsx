import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res && res.data.success) {
        toast.success(res.data.message || "Registration Successful!");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Visitha Mobile">
      <div className="container d-flex justify-content-center align-items-center my-5" style={{ minHeight: "70vh" }}>
        <form onSubmit={handleSubmit} className="card p-4 shadow border-0" style={{ width: "26rem" }}>
          <h3 className="text-center fw-bold mb-4">CREATE ACCOUNT</h3>
          <div className="mb-3">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter Full Name" required />
          </div>
          <div className="mb-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter Email Address" required />
          </div>
          <div className="mb-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Secure Password" required />
          </div>
          <div className="mb-3">
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="Enter Mobile Number" required />
          </div>
          <div className="mb-3">
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Enter Delivery Address" rows="2" required />
          </div>
          <button type="submit" className="btn btn-dark w-100 fw-bold shadow-sm">REGISTER</button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;