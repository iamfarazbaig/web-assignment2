import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
      <li>
        <a onClick={logout} href={"#!"}>
          Logout
        </a>
      </li>
    </ul>
  );
  const unAuthLinks = (
    <ul>
      <li>
        <a onClick={logout} href={"#!"}>
          Logout
        </a>
      </li>
      <li>
        <Link to={"/register"}>Register</Link>
      </li>
      <li>
        <Link to={"/login"}>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to={"/"}>
          <i className="fas fa-code" /> Portfolio
        </Link>
      </h1>
      {/*if not loading then do check for authentication*/}
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : unAuthLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
