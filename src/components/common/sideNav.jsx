import React from "react";
import { Link } from "react-router-dom";
import "../css/sideNav.css";

const SideNav = ({ items }) => {
  return (
    <ul className="nav flex-column m-2 p-0" id="sideNav">
      {items.map((item) => (
        <li className="nav-item">
          <Link key={item.title.lengh} to={item.to} className="nav-link">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SideNav;
