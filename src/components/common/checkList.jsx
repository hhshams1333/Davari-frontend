import React from "react";

const CheckList = (props) => {
  return (
    <React.Fragment>
      <div className="row mt-3">
        <h4>{props.title}</h4>
      </div>
      {props.checkItems.map((item) => (
        <div class="form-group">
          <label>{item.value}</label>
          <input
            type="checkbox"
            value={item.value}
            name={item.name}
            class="form-check-input mx-2"
            style={{ float: "right" }}
          />
        </div>
      ))}
    </React.Fragment>
  );
};

export default CheckList;
