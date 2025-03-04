import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo1.png";
import logoMobile from "../images/logo2.png";
import { FaCartArrowDown } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import Cart from "./Cart/Cart";
import styled from "styled-components";
import { LoggedInUserContext } from "../pages/LoginSignUp/LoggedInUserContext";
import { NavLink } from "react-router-dom";

// Navigation Bar for the page
const NavBar = () => {
  // Use state function for Cart visibility
  const [isCartVisible, setIsCartVisibile] = useState(false);
  //Set name of the user that logged in
  const { loggedInUser, logOut, isAuthenticated } =
    useContext(LoggedInUserContext);
  const name = loggedInUser && loggedInUser.user ? loggedInUser.user.fname : "";

  // Function to toggle the visibility of the cart
  const toggleCart = () => setIsCartVisibile(!isCartVisible);

  return (
    <>
      <nav>
        <Link to="/">
          <Logo src={logo} alt="Logo" mobileSrc={logoMobile} />
        </Link>
        <div className="navText">
          <Link to="/products" className="navLink">
            shop all
          </Link>
          <Link to="/brands" className="navLink">
            brands
          </Link>
          <Link to="/contact" className="navLink">
            contact
          </Link>
          <Link to="/about" className="navLink">
            about
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Navbar icons that toggle cart on press */}
          <FaCartArrowDown className="navbar-buttons" onClick={toggleCart} />
          {/* Navbar icons for login if user is not logged in yet */}
          {!isAuthenticated && (
            <>
              <NavLink to="/login">
                <IoPersonSharp
                  style={{ background: "transparent" }}
                  className="navbar-buttons"
                  title="Click to login or sign up!"
                />
              </NavLink>
            </>
          )}
          {/* Navbar icons for logout if user is logged in */}
          {isAuthenticated && (
            <>
              <p style={{ margin: "0 15px 0 0" }}>{name}</p>
              <button
                onClick={() => logOut()}
                style={{ background: "transparent" }}
                className="navbar-buttons"
              >
                <IoMdLogOut
                  className="navbar-buttons"
                  title="Click to logout!"
                />
              </button>
            </>
          )}
        </div>
      </nav>
      <Cart isVisible={isCartVisible} />
    </>
  );
};

export default NavBar;

const Logo = styled.img`
  width: auto;
  height: clamp(34px, calc(2.125rem + ((1vw - 3.9px) * 1.0458)), 50px);

  @media (max-width: 768px) {
    content: url(${(props) => props.mobileSrc});
    height: clamp(20px, calc(1.25rem + ((1vw - 3.3px) * 6.8493)), 50px);
  }
`;
