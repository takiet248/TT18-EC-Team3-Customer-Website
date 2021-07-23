import React, { useEffect } from "react";
import "./Header.scss";
import logo from "../../assets/icons/primary.png";
import { SearchBar } from "../SearchBar/SearchBar";
import { FiBell } from "react-icons/fi";
import { Button } from "../common";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { doLogOut } from "../../redux/actions/userActions";

export const Header: React.FC<IHeader> = ({}) => {
  const history = useHistory();
  const token = localStorage.getItem("access");
  const dispatch = useDispatch();
  useEffect(() => {
    token !== null && console.log("hihi");
  }, []);
  return (
    <div className="header">
      <img
        src={logo}
        className="header__logo"
        onClick={() => history.push("/")}
      />
      <SearchBar paddingRight={30} placeholder="Find your best tutor here" />
      <FiBell size={26} className="header__noti" />
      {!token ? (
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
      ) : (
        <Button
          onClick={() => {
            dispatch(doLogOut());
          }}
        >
          Log Out
        </Button>
      )}
    </div>
  );
};
