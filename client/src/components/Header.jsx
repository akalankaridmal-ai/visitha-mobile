import React from 'react';
import { ShoppingCart, Smartphone, Search } from 'lucide-react';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container-fluid px-lg-5">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <Smartphone className="me-2 text-primary" />
          <span className="fw-bold">VISITHA MOBILE</span>
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarMain">
          {/* SEARCH BAR IN MIDDLE */}
          <form className="d-flex mx-auto col-lg-5 mt-3 mt-lg-0">
            <div className="input-group w-100">
              <input 
                className="form-control border-0" 
                type="search" 
                placeholder="Search phones (e.g. iPhone 14)..." 
                aria-label="Search" 
              />
              <button className="btn btn-primary" type="submit">
                <Search size={18} />
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link px-3" href="/">Home</a></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle px-3" href="#" data-bs-toggle="dropdown">Shop</a>
              <ul className="dropdown-menu dropdown-menu-dark shadow border-0 mt-2">
                <li><a className="dropdown-item" href="#">Brand New</a></li>
                <li><a className="dropdown-item" href="#">Used Mobiles</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link position-relative px-3 ms-lg-2" href="#">
                <ShoppingCart size={22} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;