import { Link } from "react-router-dom";
import "./NavBar.css";
import { useState, useEffect } from "react";
import { getUserCartCount } from "../../services/shoppingCartServices/shoppingCartService.js";

export const NavBar = ({ shoppingCart }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartPulse, setCartPulse] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("thorns_roses_user"));

  useEffect(() => {
    if (currentUser?.id) {
      getUserCartCount(currentUser.id)
        .then(setCartCount)
        .catch((error) => console.error("Error fetching cart count:", error));

      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shoppingCart]);

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <div className="col-4 d-flex justify-content-start align-items-center">
          <div className="navbar-brand">
            <Link className="nav-link text-white" to="/">
              <span className="text-white ms-3">THORNS-N-ROSES</span>
              <img
                src="https://i.imgur.com/PHjQUbh.png"
                alt=""
                className="homeIMG"
              />
            </Link>
          </div>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <div className="nav-item text-center">
            <Link className="nav-link text-white" to="/nurseries">
              Nurseries
            </Link>
          </div>
          <div className="nav-item text-center mx-5">
            <Link className="nav-link text-white" to="/distributors">
              Distributors
            </Link>
          </div>
          <div className="nav-item text-center me-5">
            <Link className="nav-link text-white" to="/retailers">
              Retailers
            </Link>
          </div>
        </div>

        <div className="col-4 d-flex justify-content-end align-items-center">
          <div className="nav-item text-center d-flex align-items-center">
            <Link
              className="nav-link text-white bi bi-cart3 fs-5"
              to="/shoppingcart"
            >
              <span className={`ms-2 cart-icon ${cartPulse ? 'pulse' : ''}`}>
                (<span className="price fs-6">{cartCount}</span>)
              </span>
            </Link>
          </div>
          {localStorage.getItem("thorns_roses_user") ? (
            <li className="navbar-item navbar-logout">
              <Link
                className="navbar-link"
                to=""
                onClick={() => {
                  localStorage.removeItem("thorns_roses_user");
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </Link>
            </li>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};
