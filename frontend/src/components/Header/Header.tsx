import React from "react";
import "./Header.scss";
import logo from "../../assets/icons/primary.png";
import { SearchBar } from "../SearchBar/SearchBar";
import { FiBell } from "react-icons/fi";
import { Button } from "../common";

export const Header: React.FC<IHeader> = ({}) => {
  return (
    <div className="header">
      <img src={logo} className="header__logo" />
      <SearchBar />
      <FiBell size={26} className="header__noti" />
      <div className="header__button-wrapper">
      <Button isWhite={true}>Log In</Button>
      <Button>Sign Up</Button>
      </div>
    
    </div>
  );
};
