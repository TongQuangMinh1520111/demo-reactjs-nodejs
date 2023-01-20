import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Auth } from "../context/Auth";
import { Store } from "../context/Store";

const Header = () => {
  // const { dispatch } = useContext(Auth);
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const handleClickRender = () => {
    console.log("link")
    // dispatch({
    //   type: "CHECK_RENDER_FALSE",
    // });
  };
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <header id="header">
      <div className="inner">
        <div className="header_cont">
          <h1 id="logo">
            <Link to="/" className="navbar-brand">
              React CRUD Example
            </Link>
          </h1>
          <div id="gnavi">
            <ul className="menu">
              <li className="item">
                <Link to={"/"}  onClick={handleClickRender}>
                  Home
                </Link>
              </li>
              <li className="item">
                <Link to={"/products"}  onClick={handleClickRender}>
                  Products
                </Link>
              </li>
              <li className="item">
                <Link to="/search">
                  <span>Search</span>
                </Link>
              </li>
              <li className="item">
                <Link to={"/register"} onClick={handleClickRender}>
                  Register
                </Link>
              </li>
              <li className="item">
                <Link to={"/login"} onClick={handleClickRender}>
                  Login
                </Link>
              </li>
              <li className="item">
                <Link to="/profile">
                  <span>Profile</span>
                </Link>
              </li>
              <li className="item">
                <Link to="/cart">
                  <span>Cart {cartItemsCount}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
