import React from "react";

import SelectBox from "devextreme-react/select-box";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./Localization.scss";

const selectBoxInputAttr = {id: "selectInput"};

const Localization = () => {
  const {lang, locales, changeLocale} = useLocalization();
  return (
    <div className="option">
      {/* <label htmlFor="selectInput">{formatMessage("language")}</label>
      &nbsp; */}
      <SelectBox
        items={locales} //languages arr from pages-fetch
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
