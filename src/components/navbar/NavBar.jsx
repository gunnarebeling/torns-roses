import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      {" "}
      {/* Add fixed-top and bg-dark for styling */}
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
          <div className="nav-item text-center">
            <Link className="nav-link text-white" to="/shoppingcart">
              Shopping Cart
            </Link>
          </div>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
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
