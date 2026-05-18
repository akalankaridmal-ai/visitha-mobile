import React from 'react';
import { ShoppingCart, Smartphone, Search } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSearch } from "../context/search";
import axios from "axios";
import { useCart } from "../context/cart";

const Header = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart] = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search"); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container-fluid px-lg-5">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Smartphone className="me-2 text-primary" />
          <span className="fw-bold">VISITHA MOBILE</span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarMain">
          {/* SEARCH BAR IN MIDDLE */}
          <form className="d-flex mx-auto col-lg-5 mt-3 mt-lg-0" onSubmit={handleSubmit}>
            <div className="input-group w-100">
              <input 
                className="form-control border-0" 
                type="search" 
                placeholder="Search phones (e.g. iPhone 14)..." 
                aria-label="Search" 
                value={values.keyword}
                onChange={(e) => setValues({ ...values, keyword: e.target.value })}
              />
              <button className="btn btn-primary" type="submit">
                <Search size={18} />
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle px-3" href="#" data-bs-toggle="dropdown">Shop</a>
              <ul className="dropdown-menu dropdown-menu-dark shadow border-0 mt-2">
                <li><Link className="dropdown-item" to="/shop/brand-new">Brand New</Link></li>
                <li><Link className="dropdown-item" to="/shop/used">Used Mobiles</Link></li>
              </ul>
            </li>
            
            {/* UPDATED CART ITEM WITH LIVE BADGE COUNT */}
            <li className="nav-item me-3">
              <NavLink to="/cart" className="nav-link position-relative px-3 ms-lg-2">
                <ShoppingCart size={22} />
                {cart?.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart?.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;