import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class Party extends Form {
  state = {
    data: {
      name: "",
      faName: "",
      idCode: "",
      postCode: "",
      phoneNumber: "",
      address: "",
      userAuth: "c",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required(),
    faName: Joi.string().required(),
    idCode: Joi.number().required(),
    postCode: Joi.number(),
    phoneNumber: Joi.number().required(),
    address: Joi.string().required(),
    userAuth: Joi.string(),
  };
  componentDidMount() {
    const { items } = this.props;
    if (items) {
      this.setState({
        data: {
          name: items.name,
          address: items.address,
          phoneNumber: items.phoneNumber,
          idCode: items.idCode,
          faName: items.faName,
          postCode: items.postCode,
        },
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      const { items } = this.props;
      this.setState({
        data: {
          name: items.name,
          address: items.address,
          phoneNumber: items.phoneNumber,
          idCode: items.idCode,
          faName: items.faName,
          postCode: items.postCode,
        },
      });
    }
  }
  getLocation = () => {
    const data = { ...this.state.data };
    if (data.userAuth === "m") return "/admin";
    if (data.userAuth === "n") return "/supervisor";
  };
  doSubmit = () => {
    this.props.doSubmit(this.state.data);
  };
  render() {
    return (
      <div>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-lg-4">
              {this.renderInput("name", "نام و نام خانوادگی")}
            </div>
            <div className="col-lg-4">
              {this.renderInput("faName", "نام پدر")}
            </div>
            <div className="col-lg-4">
              {this.renderInput("idCode", "کد ملی")}
            </div>
            <div className="col-lg-4">
              {this.renderInput("postCode", "کدپستی")}
            </div>
            <div className="col-lg-4">
              {this.renderInput("phoneNumber", "شماره همراه")}
            </div>
          </div>
          <div className="row">
            <div className="col-md"> {this.renderInput("address", "آدرس")}</div>
          </div>
          <div className="row mt-3 ">
            <div className="col-lg-2">{this.renderButton("ثبت اطلاعات ")}</div>
          </div>
        </form>
      </div>
    );
  }
}

export default Party;
