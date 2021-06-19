import React, { Component } from "react";
import { Link } from "react-router-dom";

class FormList extends Component {
  render() {
    const { formItems, formLinks, display = "1" } = this.props;
    if (!display) return null;
    else
      return (
        <form autoComplete="off" calasName="form-inline">
          <div className="row">
            {formItems
              ? formItems.map((item) =>
                  !item.long ? (
                    <div className="col-md">
                      <label className=" col-form-label col-form-label-sm">
                        {item.content}
                      </label>
                      <input
                        type={item.type}
                        name={item.id}
                        className="form-control  col-md"
                      />
                    </div>
                  ) : null
                )
              : null}
          </div>
          <div className="row">
            {formItems
              ? formItems.map((item) =>
                  item.long ? (
                    <div class="form-group">
                      <label className=" col-form-label col-form-label-sm">
                        {item.content}
                      </label>
                      <input
                        type={item.type}
                        name={item.id}
                        className="form-control  col-md"
                      />
                    </div>
                  ) : null
                )
              : null}
          </div>
          <div className="row justify-content-center mt-2">
            {formLinks
              ? formLinks.map((link) => (
                  <Link
                    className="btn btn-primary col-5 m-4"
                    to={link.to}
                    onClick={link.onClick}
                  >
                    {link.content}
                  </Link>
                ))
              : null}
          </div>
        </form>
      );
  }
}

export default FormList;
/*  */
{
  /*  */
}
