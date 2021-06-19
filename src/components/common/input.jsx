import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group w-100">
      <label className="float-right" htmlFor={name}>
        {label}
      </label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
