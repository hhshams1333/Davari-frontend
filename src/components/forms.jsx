import React from "react";
import ChoosePanel from "./choosePanel";
const ArbiForm = () => {
  const formList = [
    {
      id: "1",
      content: ` فرم مخصوص دادخواست موسسه داوری ندای عدل `,
      header: " دادخواست ",
    },
    {
      id: "5",
      content: ` قرارداد داوری که به امضای طرفین رسیده باشد به داور صلاحیت رسیدگی می بخشد `,
      header: " قرارداد داوری ",
    },
    {
      id: "2",
      content: ` فرم اظهارات گواه در جلسات استماع شهادت شهود استفاده می گردد`,
      header: " اظهارات گواه",
    },
    {
      id: "3",
      content: ` فرم ادامه اظهارات گواه ، مخصوص شهادت نامه هایی که چند صفحه هستند `,
      header: "ادامه اظهارات گواه",
    },
    {
      id: "4",
      content: ` فرم مخصوص صورتجلسه در جلسات رسیدگی استفاده می گردد `,
      header: "صورتجلسه",
    },
    {
      id: "6",
      content: ` فرم مخصوص صورتجلسه در جلسات رسیدگی استفاده می گردد `,
      header: "اظهارنامه ",
    },
  ];
  return <ChoosePanel items={formList} />;
};

export default ArbiForm;
