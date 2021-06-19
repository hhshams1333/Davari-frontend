import React, { Component } from "react";
import { logout } from "./../../services/authService";
import SideNav from "../common/sideNav";
import TopNav from "../common/topNav";
import { Route, Switch, Redirect } from "react-router-dom";
import NewCase from "../newCase";
import AnnounceForm from "../announceForm";
// import ExpertForm from "../expertForm";
// import InquiryForm from "../inquiryForm";
import ArbiForm from "../forms";
import CaseCheck from "../caseCheck";
import CaseUpload from "./../caseUpload";
import CaseItem from "../caseItem";
import SupComments from "./../supComments";
import authService from "../../services/authService";

class AdminPanel extends Component {
  state = { user: {} };
  sideNavItems = [
    { title: "تشکیل پرونده", to: "/admin/newCase" },
    { title: "آپلود پرونده", to: "/admin/caseUpload" },
    // {
    //   title: "فرم های مورد نیاز",
    //   to: "/admin/forms",
    // },
    { title: "چاپ ابلاغیه", to: "/admin/announceForm" },
    // { title: "چاپ استعلام", to: "/admin/inquiryForm" },
    // { title: "چاپ اجرائیه", to: "/admin/inquiryForm" },
    // { title: "چاپ قرارکارشناسی", to: "/admin/expertForm" },
    { title: "بررسی پرونده ها", to: "/admin/caseCheck" },
    { title: "پیام ناظران", to: "/admin/supComments" },
    { title: "خروج ", to: "/admin/logout" },
  ];
  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <div className="container-fluid p-0 h-100">
        <TopNav header={` پنل کاربری آقای -${this.state.user.name}`} />
        <div className="row m-0 p-0 h-100">
          <div className="col-md-2 p-0" id="sideNav">
            <SideNav items={this.sideNavItems} />
          </div>
          <div className="col-md mt-3">
            <div className="container h-100 ">
              <div className="row">
                <div className="border rounded p-2 p-md-5">
                  <Switch>
                    <Route
                      path="/admin/case/:id"
                      render={(props) => <CaseItem {...props} />}
                    />
                    <Route
                      path="/admin/caseUpload/:id"
                      render={(props) => <CaseUpload {...props} />}
                    />
                    <Route path="/admin/newCase" component={NewCase} />
                    <Route path="/admin/logout" component={logout} />
                    <Route path="/admin/caseUpload" component={CaseUpload} />
                    <Route
                      path="/admin/announceForm"
                      component={AnnounceForm}
                    />
                    <Route path="/admin/supComments" component={SupComments} />
                    {/* <Route path="/admin/expertForm" component={ExpertForm} /> */}
                    {/* <Route path="/admin/inquiryForm" component={InquiryForm} /> */}
                    <Route path="/admin/forms" component={ArbiForm} />
                    <Route path="/admin/caseCheck" component={CaseCheck} />
                    <Redirect from="/admin" exact to="/admin/newCase" />
                    <Redirect to="/not-found" />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPanel;
