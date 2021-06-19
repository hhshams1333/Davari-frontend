import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import Party from "./party";
import { ToastContainer, toast } from "react-toastify";
import { setCase } from "../services/caseServicde";
import { register } from "../services/registerService";
import { Link } from "react-router-dom";

class NewCase extends Form {
  state = {
    data: {
      arbi: "",
      value: "",
      caseNum: "",
    },
    p1: {},
    p2: {},
    errors: {},
  };
  schema = {
    caseNum: Joi.required(),
    arbi: Joi.required(),
    value: Joi.number().required(),
  };

  doSubmitP1 = (s) => {
    this.setState({ p1: s });
  };
  doSubmitP2 = (s) => {
    this.setState({ p2: s });
  };
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await setCase(
        data.caseNum,
        data.value,
        this.state.p1,
        this.state.p2,
        data.arbi
      );

      const { name, faName, idCode, postCode, phoneNumber, address, userAuth } =
        this.state.p1;
      await register(
        name,
        faName,
        idCode,
        postCode,
        phoneNumber,
        address,
        userAuth,
        data.caseNum
      );
      const {
        name: n,
        faName: f,
        idCode: i,
        postCode: p,
        phoneNumber: ph,
        address: a,
        userAuth: u,
      } = this.state.p2;
      await register(n, f, i, p, ph, a, u, data.caseNum);
      toast.success("پرونده با موفقیت ثبت شد");
      setTimeout(() => {
        this.props.history.push("/admin/caseUpload");
      }, 2000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error("پرونده ثبت نشد");
        setTimeout(() => {
          this.props.history.push("/admin/newCase");
        }, 2000);
      }
    }
  };
  setClases = () => {
    if (Object.keys(this.state.p1).length < 7) return "d-none";
    if (Object.keys(this.state.p1).length === 7) {
      if (Object.keys(this.state.p2).length === 7) return "d-none";
      return "";
    }
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div
          className={Object.keys(this.state.p1).length === 7 ? "d-none" : ""}
        >
          <h3>ثبت اطلاعات هویتی خواهان</h3>
          <Party doSubmit={this.doSubmitP1} />
        </div>
        <div className={this.setClases()}>
          <h3>ثبت اطلاعات هویتی خوانده</h3>
          <Party doSubmit={this.doSubmitP2} />
        </div>
        <div
          className={Object.keys(this.state.p2).length === 7 ? "" : "d-none"}
        >
          <h3>ثبت سایر اطلاعات </h3>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-2">
                {this.renderInput("caseNum", "شماره پرونده")}
              </div>
              <div className="col-md-3">
                {this.renderInput("value", "ارزش خواسته")}
              </div>
              <div className="col-md">{this.renderInput("arbi", "داور")}</div>
              <div className="row mt-3">
                <div className="col-md">{this.renderButton("ثبت پرونده")}</div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default NewCase;
