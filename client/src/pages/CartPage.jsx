// client/src/pages/CartPage.jsx
import React from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Calculate cart total summary prices
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => { total += item.price; });
      return total.toLocaleString("en-LK", { style: "currency", currency: "LKR" });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove individual line item from state array
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);
    }
  };

  // Simulated cash on delivery submission
  const handleCheckoutPayment = () => {
    try {
      toast.loading("Processing order request terminal check...");
      setTimeout(() => {
        toast.dismiss();
        toast.success("Order Placed Successfully! Thank you for purchasing from Visitha Mobile.");
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Checkout failed");
    }
  };

  return (
    <Layout title="Shopping Cart - Visitha Mobile">
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12 text-center bg-light p-3 rounded mb-5 shadow-sm">
            <h2 className="fw-bold">Your Cart</h2>
            <p className="text-secondary mb-0">
              {cart?.length > 0 
                ? `You have ${cart.length} item(s) in your basket ${auth?.token ? "" : " | Please login to complete checkout"}`
                : "Your basket path selection is completely empty"}
            </p>
          </div>
        </div>
        <div className="row">
          {/* ITEMS GRID */}
          <div className="col-md-7">
            {cart?.map((p) => (
              <div className="row card flex-row p-3 mb-3 shadow-sm border-0 align-items-center" key={p._id}>
                <div className="col-md-4 text-center">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    height="120px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="col-md-8">
                  <h5 className="fw-bold">{p.name}</h5>
                  <p className="text-muted small mb-1">{p.brand} | {p.category}</p>
                  <h6 className="text-primary fw-bold">LKR {p.price?.toLocaleString()}</h6>
                  <button className="btn btn-danger btn-sm mt-2 fw-bold px-3" onClick={() => removeCartItem(p._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKOUT BOX */}
          <div className="col-md-5 text-center">
            <div className="card p-4 shadow-sm border-0 bg-dark text-white rounded">
              <h4 className="fw-bold mb-3 text-warning">Order Summary</h4>
              <hr className="bg-white" />
              <h5 className="my-3">Grand Total: <span className="text-success fw-bold">{totalPrice()}</span></h5>
              
              {auth?.user?.address ? (
                <div className="mb-4 bg-secondary p-3 rounded text-start small">
                  <h6 className="fw-bold text-warning">Delivery Information:</h6>
                  <p className="mb-1"><strong>Deliver To:</strong> {auth?.user?.name}</p>
                  <p className="mb-0"><strong>Shipping Address:</strong> {auth?.user?.address}</p>
                </div>
              ) : null}

              {auth?.token ? (
                <button className="btn btn-success btn-lg w-100 fw-bold mt-2 shadow" onClick={handleCheckoutPayment} disabled={!cart.length}>
                  PLACE ORDER (CASH ON DELIVERY)
                </button>
              ) : (
                <button className="btn btn-outline-warning btn-lg w-100 fw-bold mt-2" onClick={() => navigate("/login", { state: "/cart" })}>
                  LOGIN TO CHECKOUT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;