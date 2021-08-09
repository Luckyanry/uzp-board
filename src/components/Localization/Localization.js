import React from "react";

import SelectBox from "devextreme-react/select-box";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./Localization.scss";

const selectBoxInputAttr = {id: "selectInput"};

const Localization = () => {
  const {lang, locales, changeLocale, formatMessage} = useLocalization();

  return (
    <div className="option">
      <label htmlFor="selectInput">{formatMessage("language")}</label>
      &nbsp;
      <SelectBox
        items={locales}
        valueExpr="Value"
        displayExpr="Name"
        value={lang}
        onValueChanged={changeLocale}
        inputAttr={selectBoxInputAttr}
      />
    </div>
  );
};

export default Localization;
