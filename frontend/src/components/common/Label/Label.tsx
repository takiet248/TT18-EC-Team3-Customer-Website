import React from "react";
import "./Label.scss";
export const Label: React.FC<ILabel> = ({ icon, title }) => {
  return (
    <div className="label">
      <div className="label__icon">{icon}</div>
      <p className="label__title">{title}</p>
    </div>
  );
};
