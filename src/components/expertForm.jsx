import React from "react";
import FormList from "./common/formList";
const ExpertForm = () => {
  const expertFormItems = [
    {
      id: "caseNum",
      content: "شماره پرونده",
      type: "number",
    },
    {
      id: "expertName",
      content: "نام و نام خانوادگی کارشناس",
      type: "text",
    },
    {
      id: "expertSalary",
      content: "حق الزحمه علی الحساب کارشناسی",
      type: "number",
    },
    {
      id: "expertSub",
      content: "موضوع کارشناسی",
      type: "text",
      long: true,
    },
  ];
  const buttons = [
    { content: "چاپ", to: "/", onClick: () => console.log("hello") },
    { content: "بازگشت", to: "/", onClick: "" },
  ];

  return (
    <React.Fragment>
      <h2 className="mb-4">فرم آماده سازی قرار کارشناسی </h2>
      <FormList formItems={expertFormItems} formLinks={buttons} />
    </React.Fragment>
  );
};

export default ExpertForm;
