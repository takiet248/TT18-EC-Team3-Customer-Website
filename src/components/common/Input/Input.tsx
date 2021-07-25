import React from "react";
import "./Input.scss";

export const Input = React.forwardRef<any, IInput>(
  (
    {
      className,
      name,
      placeholder,
      marginBottom,
      marginTop,
      marginRight,
      marginLeft,
      isFocus = false,
      type,
      onChange,
      onBlur,
    },
    ref
  ) => {
    return (
      <div
        className={`input ${className}`}
        style={{ marginBottom, marginTop, marginRight, marginLeft }}
      >
        <input
          autoFocus={isFocus}
          placeholder={placeholder}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          type={type}
          ref={ref}
        />
      </div>
    );
  }
);
