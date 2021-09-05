import React from "react";
import "./Header.scss";
import logo from "../../assets/icons/primary.png";
import logoMobile from "../../assets/icons/secondary.png";
import { SearchBar } from "../SearchBar/SearchBar";
import { Button } from "../common";
import { useHistory } from "react-router";
import { isAuth, logout } from "../../helpers";
import { useState } from "react";

export const Header = () => {
  const history = useHistory();
  const [isOpenNavSide, setIsOpenNavSide] = useState(false);
  const navSideStyle = {
    width: "250px",
  };
  const handleOpenNavSide = () => {
    setIsOpenNavSide(true);
  };
  const handleCloseNavSide = () => {
    setIsOpenNavSide(false);
  };
  return (
    <div className="header">
      <img
        src={logo}
        alt=""
        className="header__logo"
        onClick={() => history.push("/")}
      />
      <img
        src={logoMobile}
        alt=""
        className="header__logoMobile"
        onClick={() => history.push("/")}
      />
      <SearchBar paddingRight={30} placeholder="Find your best tutor here" />
      {/* <FiBell size={26} className="header__noti" /> */}
      {isAuth() ? (
        <>
          <div className="header__button-wrapper">
            <Button
              isWhite={true}
              marginRight={8}
              onClick={() => history.push("/login")}
            >
              Log In
            </Button>
            <Button onClick={() => history.push("/sign-up")}>Sign Up</Button>
          </div>
          <span className="header__nav" onClick={handleOpenNavSide}>
            &#9776;
          </span>
        </>
      ) : (
        <>
          <span className="header__navlist" onClick={handleOpenNavSide}>
            &#9776;
          </span>
        </>
      )}
      <div
        className="header__navside"
        style={isOpenNavSide ? navSideStyle : { width: "0" }}
      >
        <div className="navside-close" onClick={handleCloseNavSide}>
          &times;
        </div>
        {isAuth() ? (
          <>
            <p
              onClick={() => {
                history.push("/login");
                handleCloseNavSide();
              }}
            >
              Login
            </p>
            <p
              onClick={() => {
                history.push("/sign-up");
                handleCloseNavSide();
              }}
            >
              Sign Up
            </p>
          </>
        ) : (
          <>
            <p>My Profile</p>
            <p
              onClick={() => {
                logout();
                handleCloseNavSide();
              }}
            >
              Log out
            </p>
          </>
        )}
      </div>
    </div>
  );
};
