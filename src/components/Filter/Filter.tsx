import React from "react";
import "./Filter.scss";

export const Filter = () => {
  return (
    <div className="filter-container">
      <div className="filter-item">
        <select name="" id="">
          <option value="" disabled selected hidden>
            Grade
          </option>
          <option value="">High School</option>
          <option value="">Secondary School</option>
          <option value="">Primary School</option>
        </select>
      </div>
      <div className="filter-item">
        <select name="" id="">
          <option value="" disabled selected hidden>
            Courses
          </option>
          <option value="">Mathematics</option>
          <option value="">Physics</option>
          <option value="">English</option>
          <option value="">Piano</option>
          <option value="">Painting</option>
        </select>
      </div>
      <div className="filter-item">
        <select name="" id="">
          <option value="" disabled selected hidden>
            Location
          </option>
          <option value="">Ho Chi Minh city</option>
          <option value="">Hanoi</option>
          <option value="">Danang</option>
          <option value="">Hue</option>
          <option value="">Can Tho</option>
        </select>
      </div>
    </div>
  );
};
