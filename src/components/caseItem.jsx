import React from "react";
import Joi from "joi-browser";
import _ from "lodash";
import Form from "./common/form";
import Party from "./party";
import { Link } from "react-router-dom";
import { getCase, updateCase } from "../services/caseServicde";
import { deleteCase } from "./../services/caseServicde";
import { toast, ToastContainer } from "react-toastify";

class CaseItem extends Form {
  state = {
    data: {
      arbi: "",
      value: "",
    },
    errors: {},
    p1: {},
    p2: {},
    caseNum: "",
  };
  schema = {
    arbi: Joi.required(),
    value: Joi.required(),
  };
  async componentDidMount() {
    const { data: caseItem } = await getCase(this.props.match.params.id);
    if (caseItem) {
      caseItem.value = caseItem.value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.setState({
        p1: caseItem.p1,
        p2: caseItem.p2,
        caseNum: caseItem.caseNum,
        data: { arbi: caseItem.arbi.name, value: caseItem.value },
      });
    } else {
      toast.error("پرونده موجود نیست");
      setTimeout(() => this.props.history.push("/admin/caseCheck"), 1000);
    }
  }
  handleDelete = async () => {
    try {
      await deleteCase(this.props.match.params.id);
      toast.success("پرونده با موفقیت حذف شد");
      setTimeout(() => this.props.history.push("/admin/caseCheck"), 1000);
    } catch (error) {
      return console.error(error);
    }
  };
  doSubmit1 = (s) => {
    this.setState({ p1: s });
    toast.success("اطلاعات جدید ثبت شد");
  };
  doSubmit2 = (s) => {
    this.setState({ p2: s });
    toast.success("اطلاعات جدید ثبت شد");
  };
  doSubmit = async () => {
    try {
      await updateCase(
        this.props.match.params.id,
        this.state.caseNum,
        this.state.p1,
        this.state.p2
      );
      toast.success("پرونده با موفقیت بروزرسانی شد");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error("مشکلی بوجو آمد");
      }
    }
  };
  render() {
    return (
      <div>
        <ToastContainer />
        <div className="">
          <h3 className="mt-3 ">اطلاعات خواهان</h3>
          <Party items={this.state.p1} doSubmit={this.doSubmit1} />
        </div>
        <div className=" mt-4">
          <h3 className="mt-4">اطلاعات خوانده</h3>
          <Party items={this.state.p2} doSubmit={this.doSubmit2} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="row mt-4">
            <div className="col-md">
              {this.renderInput("value", "ارزش خواسته")}
            </div>
            <div className="col-md">{this.renderInput("arbi", "داور")}</div>
          </div>
          <div className="col-md-2 float-end mt-4">
            {this.renderButton("بروز رسانی پرونده")}
          </div>
        </form>
        <Link
          to={`/admin/caseUpload/${this.props.match.params.id}`}
          className="btn btn-warning float-end mt-4 mx-2"
        >
          مشاهده پرونده
        </Link>
        <button
          type="button"
          class="btn btn-danger float-end mt-4 mx-1 mx-md-2 col-lg-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          حذف پرونده
        </button>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">آیا از حذف پرونده مطمئن هستید؟</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  خیر
                </button>
                <button
                  className="btn btn-danger "
                  onClick={this.handleDelete}
                  data-bs-dismiss="modal"
                >
                  حذف پرونده
                </button>
              </div>
            </div>
          </div>
        </div>

        <Link
          to="/admin/caseCheck"
          className="btn btn-primary mt-4 col-lg-2 me-2"
        >
          بازگشت
        </Link>
      </div>
    );
  }
}

export default CaseItem;
