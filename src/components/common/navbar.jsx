import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

export default function Navbar() {
  const { auth } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand" to="/">
            <img src="favicon.ico" alt="" className="w-75" />
          </Link>
          <form className="">
            <input
              className="form-control form-control-sm me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
        </div>
        <div className="">
          <ul className="navbar-nav">
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/notifications">
                    <i className="fa fa-bell"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <i className="fa fa-user-circle"></i>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
