import React from "react";
import "./SearchBar.scss";
import logo from "../../assets/icons/primary.png";

export const SearchBar: React.FC<ISearchBar> = ({
  className,
  id,
  name,
  placeholder,
  marginBottom,
  marginTop,
  isFocus = false,
  onClick,
}) => {
  return (
    <div
      className={`searchbar ${className}`}
      style={{ marginBottom, marginTop }}
    >
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={isFocus}
      />

    </div>
  );
};
