import React from "react";
import logo from "../../images/SVGs/logo.svg";
import "../css/topNav.css";
const TopNav = (props) => {
  return (
    <React.Fragment>
      <nav className="topNav p-2" style={{ textAlign: "right" }}>
        <img src={logo} height="60" alt="salam" />
        <h4 className="d-inline mx-md-5">{props.header}</h4>
      </nav>
    </React.Fragment>
  );
};

export default TopNav;
