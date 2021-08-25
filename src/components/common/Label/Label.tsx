import React from "react";
import "./Label.scss";
export const Label: React.FC<ILabel> = ({
  icon,
  title,
  marginBottom,
  marginTop,
}) => {
  return (
    <div className="label" style={{ marginBottom, marginTop }}>
      <div className="label__icon">{icon}</div>
      <div className="label__title">{title && title}</div>
    </div>
  );
};
