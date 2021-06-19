import React from "react";
import JCalendar from "reactjs-persian-calendar";
import Form from "./common/form";
import Joi from "joi-browser";
import { genPdf } from "./../services/pdfService";
import Select from "./common/select";

class AnnounceForm extends Form {
  state = { data: {}, errors: {} };
  reasons = [
    { name: "انتخاب کنید ..." },
    { name: "جلسه رسیدگی داوری", value: "جلسه رسیدگی داوری" },
    { name: "معرفی داور اختصاصی", value: "معرفی داور اختصاصی" },
    { name: "مطالعه نظریه کارشناسی", value: "مطالعه نظریه کارشناسی" },
    { name: "ابلاغ دادنامه", value: "ابلاغ دادنامه" },
  ];
  schema = {
    name: Joi.string().required(),
    faName: Joi.string().required(),
    idCode: Joi.number().required(),
    address: Joi.string().required(),
    reason: Joi.string().required(),
    caseNum: Joi.number().optional(),
    presDate: Joi.required(),
  };

  setClasses = () => {
    if (this.state.data.reason !== "جلسه رسیدگی داوری") return "d-none";
    return "row";
  };
  handleSelectChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data.reason = input.value;
    if (input.value === "مطالعه نظریه کارشناسی") {
      data.presDate = "هفت روز پس از ابلاغ";
    }
    if (input.value === "معرفی داور اختصاصی") {
      data.presDate = "هفت روز پس از ابلاغ";
    }
    if (input.value === "ابلاغ دادنامه") {
      data.presDate = "-";
    }
    this.setState({ data });
  };
  handleJCalendar = (e) => {
    const data = { ...this.state.data };
    data.presDate = e;
    this.setState({ data });
  };
  doSubmit = async () => {
    try {
      const { name, faName, idCode, address, reason, presDate, caseNum } =
        this.state.data;
      await genPdf(
        caseNum,
        name,
        faName,
        idCode,
        address,
        reason,
        this.state.hour,
        presDate,
        "پیگیری روند پرونده وفق مقررات"
      );
    } catch (ex) {
      return ex;
    }
    this.setState({
      data: {
        name: "",
        faName: "",
        idCode: "",
        presDate: "",
        address: "",
      },
      hour: undefined,
    });

    window.open("http://localhost:3001/api/announce", "_blanck");
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="my-4">فرم آماده سازی ابلاغیه</h2>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col-lg-4">
              {this.renderInput("name", "نام و نام خانوادگی")}
            </div>
            <div className="col-lg-4">
              {this.renderInput("faName", "نام پدر")}
            </div>
            <div className="col-lg-4">
              {this.renderInput("idCode", "کدملی")}
            </div>
            <div className="col-lg-4">
              {this.renderInput("address", "آدرس")}
            </div>
            <div className="col-lg-4">
              <Select
                name="reason"
                label="علت حضور"
                options={this.reasons}
                onChange={this.handleSelectChange}
              />
            </div>
            <div className="col-lg-4">
              {this.renderInput("caseNum", "شماره پرونده")}
            </div>
            <div className={this.setClasses()}>
              <div className="col-md">
                <label className="form-label">تاریخ حضور</label>
                <div className="border rounded">
                  <JCalendar
                    locale={"fa"}
                    color={"#000066"}
                    size={30}
                    onClick={this.handleJCalendar}
                  />
                </div>
                <div className="col-md form-group">
                  <label htmlFor="hour">ساعت حضور</label>
                  <input
                    name="hour"
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ hour: e.currentTarget.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row justify-content-center m-0 px-2 mt-3">
              <button disabled={this.validate()} className="btn btn-primary">
                دریافت فرم
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AnnounceForm;
{
  /* <form action="" onSubmit={this.handleSubmit}>
<div class=" row mb-3">
  <div className="col-md">
    <label for="name" class="form-label">
      آقا/خانم
    </label>
    <input class="form-control" id="name" name="name" />
  </div>
  <div className="col-md">
    <label for="fname" class="form-label">
      نام پدر
    </label>
    <input class="form-control" id="fname" name="fname" />
  </div>
  <div className="col-md">
    <label for="melli" class="form-label">
      کدملی
    </label>
    <input class="form-control" id="melli" name="melli" />
  </div>
</div>

<div className="col-md">
  <label for="address" class="form-label">
    آدرس
  </label>
  <input class="form-control" id="address" name="address" />
</div>

<div className="col-md">
  <label for="reason" class="form-label">
    علت حضور
  </label>
  <select
    class="form-select"
    id="reason"
    value={this.state.value}
    onChange={this.handleChange}
  >
    <option selected>برای باز شدن کلیک کنید</option>
    <option value="جلسه رسیدگی داوری">جلسه رسیدگی داوری</option>
    <option value="تعیین داور">تعیین داور</option>
    <option value="مطالعه نظریه کارشناسی">
      مطالعه نظریه کارشناسی
    </option>
  </select>
</div>
<div className={this.setClasses()}>
  <div className="col-md">
    <label className="form-label">تاریخ حضور</label>
  </div>
  <div className="row border rounded">
    <JCalendar
      locale={"fa"}
      color={"#000066"}
      size={30}
      onClick={console.log}
    />
  </div>
</div>

<input
  type="hidden"
  name="notc"
  value="باتوجه به صلاحیت این مرجع جهت رسیدگی ، عدم حضور مانع از پیگیری روند پرونده نمی باشد."
/>
<intput
  type="hidden"
  name="arbi"
  value="ظرف مهلت 7 روز نسبت به معرفی و تعیین داور اقدام فرمایید ."
></intput>
<intput
  type="hidden"
  name="expert"
  value="ظرف مهلت 7 روز نسبت به مطالعه نظریه کارشناسی صادره اقدام و هرگونه نظر خود را نفیا یا اثباتا اعلام فرمایید."
></intput>
<a
  href="http://localhost:3001/api/test"
  target="_blank"
  className="btn btn-primary"
>
  دریافت فرم
</a>
</form> */
}
