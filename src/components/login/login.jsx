import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../../services/authService";
import TopNav from "../common/topNav";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "", userAuth: "" },
    errors: {},
  };

  schema = {
    userAuth: Joi.string().required().label("Auth"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  getLocation = () => {
    const data = { ...this.state.data };
    if (data.userAuth === "m") return "/admin";
    if (data.userAuth === "n") return "/supervisor";
  };
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password, data.userAuth);
      window.location = this.getLocation();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <TopNav header="انتخاب پنل کاربری" />
        <div className="container" id="login">
          <div className="row mt-5 p-3 border rounded justify-content-center">
            <h3 className="mb-3 float-right">کاربری خود را انتخاب فرمایید</h3>
            <form onSubmit={this.handleSubmit}>
              {this.renderSelect("userAuth", "نوع کاربری:", [
                { name: "انتخاب کنید ...", value: "c" },
                { name: "مراجعان موسسه داوری ندای عدل", value: "c" },
                { name: "ناظران شورای حل اختلاف ", value: "n" },
                { name: "داوران موسسه داوری ندای عدل", value: "d" },
                { name: "مدیران موسسه داوری ندای عدل", value: "m" },
              ])}

              {this.renderInput("username", "نام کاربری")}
              {this.renderInput("password", "پسوورد", "password")}
              <div className="row mt-2 p-2"> {this.renderButton("ورود")}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;

{
  /*  */
}
