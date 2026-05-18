import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", { email, password });
      if (res.data && res.data.success) {
        toast.success(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - Visitha Mobile">
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <form onSubmit={handleSubmit} className="card p-4 shadow border-0" style={{ width: "24rem" }}>
          <h3 className="text-center fw-bold mb-4">LOGIN</h3>
          <div className="mb-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter Email" required />
          </div>
          <div className="mb-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" required />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">LOGIN</button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;