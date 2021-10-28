// import {useEffect, useState} from "react";
import {formatMessage} from "devextreme/localization";

import {CustomButton} from "../../components";

import {ReactComponent as UserIcon} from "./icons/userIconGreen.svg";
import {ReactComponent as LegalsIcon} from "./icons/LegalsIcon.svg";
// import {ReactComponent as RegistrationVehiclesIcon} from "./icons/RegistrationVehiclesIcon.svg";
// import {ReactComponent as TVInspectionIcon} from "./icons/TVInspectionIcon.svg";
// import {ReactComponent as AdmpracticIcon} from "./icons/AdmpracticIcon.svg";
// import {ReactComponent as ArrestControlSearchIcon} from "./icons/ArrestControlSearchIcon.svg";
// import {ReactComponent as TVStealingIcon} from "./icons/TVStealingIcon.svg";
// import {ReactComponent as DriverIcon} from "./icons/DriverIcon.svg";
// import {ReactComponent as ExamClassIcon} from "./icons/ExamClassIcon.svg";
// import {ReactComponent as SpecialProductsIcon} from "./icons/SpecialProductsIcon.svg";
// import {ReactComponent as TrafficAccidentsIcon} from "./icons/TrafficAccidentsIcon.svg";
// import {ReactComponent as PenaltyAreaIcon} from "./icons/PenaltyAreaIcon.svg";
// import {ReactComponent as FacturaIcon} from "./icons/FacturaIcon.svg";
// import {ReactComponent as RoadObjectIcon} from "./icons/RoadObjectIcon.svg";
// import {ReactComponent as StaffIcon} from "./icons/StaffIcon.svg";
// import {ReactComponent as PersonnelAssessmentIcon} from "./icons/PersonnelAssessmentIcon.svg";
// import {ReactComponent as MonitoringIcon} from "./icons/MonitoringIcon.svg";

import "./HomePage.scss";

const buttonOptions = [
  {
    pathTo: "/personObjects",
    btnTitle: "msgHomeBtnTitleEmployees",
    btnDesc: "msgHomeBtnDescEmployees",
    icon: UserIcon,
  },
  {
    pathTo: "/legals",
    btnTitle: "msgHomeBtnTitleLegals",
    btnDesc: "msgHomeBtnDescLegals",
    icon: LegalsIcon,
  },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleRegistrationVehicles",
  //   btnDesc: "msgHomeBtnDescRegistrationVehicles",
  //   Icon: RegistrationVehiclesIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleTVInspection",
  //   btnDesc: "msgHomeBtnDescTVInspection",
  //   Icon: TVInspectionIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleAdmpractic",
  //   btnDesc: "msgHomeBtnDescAdmpractic",
  //   Icon: AdmpracticIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleArrestControlSearch",
  //   btnDesc: "msgHomeBtnDescArrestControlSearch",
  //   Icon: ArrestControlSearchIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleTVStealing",
  //   btnDesc: "msgHomeBtnDescTVStealing",
  //   Icon: TVStealingIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleDriver",
  //   btnDesc: "msgHomeBtnDescDriver",
  //   Icon: DriverIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleExamClass",
  //   btnDesc: "msgHomeBtnDescExamClass",
  //   Icon: ExamClassIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleSpecialProducts",
  //   btnDesc: "msgHomeBtnDescSpecialProducts",
  //   Icon: SpecialProductsIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleTrafficAccidents",
  //   btnDesc: "msgHomeBtnDescTrafficAccidents",
  //   Icon: TrafficAccidentsIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitlePenaltyArea",
  //   btnDesc: "msgHomeBtnDescPenaltyArea",
  //   Icon: PenaltyAreaIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleFactura",
  //   btnDesc: "msgHomeBtnDescFactura",
  //   Icon: FacturaIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleRoadObject",
  //   btnDesc: "msgHomeBtnDescRoadObject",
  //   Icon: RoadObjectIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleStaff",
  //   btnDesc: "msgHomeBtnDescStaff",
  //   Icon: StaffIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitlePersonnelAssessment",
  //   btnDesc: "msgHomeBtnDescPersonnelAssessment",
  //   Icon: PersonnelAssessmentIcon,
  // },
  // {
  //   pathTo: "",
  //   btnTitle: "msgHomeBtnTitleMonitoring",
  //   btnDesc: "msgHomeBtnDescMonitoring",
  //   Icon: MonitoringIcon,
  // },
];

export const HomePage = () => {
  const elements = buttonOptions.map((item, idx) => (
    <li className="item" key={idx}>
      <CustomButton key={idx} Icon={item.icon} {...item} />
    </li>
  ));

  return (
    <div className={"home-container"}>
      <h2 className={"home-title"}>{formatMessage("msgHomeHeaderTitle")}</h2>

      <ul className="list">{elements}</ul>
    </div>
  );
};
