import React from "react";

import SelectBox from "devextreme-react/select-box";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./Localization.scss";

const selectBoxInputAttr = {id: "selectInput"};

const Localization = () => {
  const {lang, langData, changeLocale} = useLocalization();
  return (
    <div className="option">
      {/* <label htmlFor="selectInput">{formatMessage("msgLanguage")}</label>
      &nbsp; */}
      <SelectBox
        items={langData}
        valueExpr="short"
        displayExpr="nativename"
        value={lang}
        onValueChanged={changeLocale}
        inputAttr={selectBoxInputAttr}
      />
    </div>
  );
};

export default Localization;
