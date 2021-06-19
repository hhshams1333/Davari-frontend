import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import Input from "./common/input";
import { getCaseImages, upload } from "../services/imageService";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCase, getCaseByCaseNum } from "./../services/caseServicde";
import { toast, ToastContainer } from "react-toastify";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import "./css/image.css";

SwiperCore.use([Navigation, Pagination]);
class CaseUpload extends Form {
  state = {
    data: {
      name: "",
      desc: "",
      img: "",
    },
    caseNum: "",
    formVisible: "none",
    caseImages: [],
    errors: {},
  };

  schema = {
    name: Joi.string().required(),
    desc: Joi.required(),
    img: Joi.string().required(),
    file: Joi.required(),
  };
  options = [
    { name: "انتخاب کنید ..." },
    { name: "دادخواست", value: "1" },
    { name: "قرارداد داوری", value: "2" },
    { name: "فیش حق الزحمه داوری", value: "3" },
    { name: "مدارک خواهان", value: "4" },
    { name: "ابلاغ", value: "5" },
    { name: "صورتجلسه", value: "6" },
    { name: "اظهارات گواه", value: "7" },
    { name: "دستور داور", value: "8" },
    { name: "مدارک خوانده", value: "9" },
    { name: "استعلام", value: "10" },
    { name: "پاسخ استعلام", value: "11" },
    { name: "قرارکارشناسی", value: "12" },
    { name: "نظریه کارشناسی", value: "13" },
    { name: "رای", value: "14" },
    { name: "سایر", value: "15" },
  ];
  async componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ formVisible: true });
      const { data: caseItem } = await getCase(this.props.match.params.id);
      console.log(caseItem);
      if (caseItem) {
        this.setState({ formVisible: "", caseNum: caseItem.caseNum });
        const { data: caseImages } = await getCaseImages(this.state.caseNum);
        this.setState({ caseImages });
      } else {
        toast.error("پزونده ثبت نشده است ");
        setTimeout(() => {
          this.props.history.push("/admin/newCase");
        }, 2000);
      }
    }
  }

  myHandleChange = ({ currentTarget: input }) => {
    const caseNum = input.value;
    this.setState({ caseNum });
  };
  handleClick = async () => {
    const { data: caseItem } = await getCaseByCaseNum(this.state.caseNum);
    if (caseItem) {
      this.setState({ formVisible: "" });
      const { data: caseImages } = await getCaseImages(this.state.caseNum);
      this.setState({ caseImages });
    } else {
      toast.error("پرونده ثبت نشده است ");
      setTimeout(() => {
        this.props.history.push("/admin/newCase");
      }, 2000);
    }
  };
  doSubmit = async () => {
    try {
      const { name, desc, file } = this.state.data;
      await upload(this.state.caseNum, name, desc, file);
      toast.success("فرم ثبت شد");
    } catch (ex) {
      toast.error("ارتباط با سرور ممکن نیست");
    }
    const { data: caseImages } = await getCaseImages(this.state.caseNum);
    this.setState({ caseImages, data: { name: "", desc: "", img: "" } });
  };

  render() {
    return (
      <div className="row">
        <ToastContainer />
        <h3>آپلود مدارک پرونده </h3>
        <div className="row">
          <div className="col-md">
            <Input
              label="شماره پرونده"
              onChange={this.myHandleChange}
              value={this.state.caseNum}
            />
          </div>
          <div className="col-md">
            <button
              className="btn btn-primary mt-4 w-100"
              onClick={this.handleClick}
            >
              جستجو پرونده
            </button>
          </div>
        </div>
        <div style={{ display: this.state.formVisible }} className="row mt-5">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-4">
                {this.renderSelect(
                  "name",
                  "نام فرم را انتخاب کنید",
                  this.options
                )}
              </div>
              <div className="col-md">
                {this.renderInput("desc", "توضیحات")}
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-md">
                {this.renderInput("img", "انتخاب فرم", "file")}
              </div>
              <div className="col-md mt-4">{this.renderButton("ثبت فرم")}</div>
            </div>
          </form>
        </div>
        <div className="row mt-3"></div>
        <div className="row justify-content-center ">
          <div className="col-md-6">
            <Swiper
              navigation={true}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              {this.state.caseImages.map((i) => (
                <SwiperSlide>
                  <img
                    src={`http://localhost:3001/api/images/${this.state.caseNum}/${i.url}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    );
  }
}

export default CaseUpload;
