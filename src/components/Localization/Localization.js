import React from "react";

import SelectBox from "devextreme-react/select-box";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./Localization.scss";

const selectBoxInputAttr = {id: "selectInput"};

const Localization = () => {
  const {lang, langData, changeLocale} = useLocalization();
  return (
    <div className="option">
      {/* <label htmlFor="selectInput">{formatMessage("language")}</label>
      &nbsp; */}
      <SelectBox
        items={langData} //languages arr from pages-fetch
        valueExpr="short" //en
        displayExpr="nativename" //English
        value={lang} //en
        onValueChanged={changeLocale}
        inputAttr={selectBoxInputAttr}
      />
    </div>
  );
};

export default Localization;
