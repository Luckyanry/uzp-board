import React from "react";

import SelectBox from "devextreme-react/select-box";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./Localization.scss";

const selectBoxInputAttr = {id: "selectInput"};

const Localization = () => {
  const {lang, locales, changeLocale, formatMessage} = useLocalization();
  console.log(`Localization state`, lang);

  return (
    <div className="option">
      <label htmlFor="selectInput">{formatMessage("Language")}</label>
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
