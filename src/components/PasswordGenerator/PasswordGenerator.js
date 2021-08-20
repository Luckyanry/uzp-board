import React, {useEffect, useState} from "react";
import {TextBox, Button as TextBoxButton} from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import ValidationSummary from "devextreme-react/validation-summary";
import {
  Validator,
  RequiredRule,
  // CompareRule,
  // PatternRule,
  // StringLengthRule,
  // RangeRule,
  // AsyncRule
} from "devextreme-react/validator";
import "./PasswordGenerator.scss";

// import {useLocalization} from "../../contexts/LocalizationContext";

import {FetchData} from "../../api/pages-fetch";

export const PasswordGenerator = () => {
  const [passwordState, setPasswordState] = useState("");
  const [passwordMode, setPasswordMode] = useState("password");
  const [passwordFetchRules, setPasswordFetchRules] = useState(null);

  const dictionaryByName = FetchData("/DictionaryByName").fetchData;
  // const {formatMessage} = useLocalization();

  const passwordButton = {
    icon: "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/icons/eye.png",
    type: "default",
    onClick: () => {
      setPasswordMode(() => (passwordMode === "text" ? "password" : "text"));
    },
  };
  const passwordGeneratorBtn = {
    icon: "add",
    type: "default",
    onClick: () => {
      setPasswordMode(() => (passwordMode === "text" ? "password" : "text"));
    },
  };

  useEffect(() => {
    dictionaryByName
      ._loadFunc()
      .then((res) => res.data)
      .then((arr) => setPasswordFetchRules(arr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(`Profile passwordFetchRules`, passwordFetchRules);

  return (
    <>
      <div className="dx-fieldset">
        <div className="dx-field">
          <div className="dx-field-label">
            <h6 className="title">Password: </h6>
          </div>
          <div className="dx-field-value">
            <TextBox
              placeholder="Enter password"
              stylingMode="filled"
              // showClearButton={true}
              // defaultValue="F5lzKs$0T"
              defaultValue={passwordState}
              mode={passwordMode}
            >
              <TextBoxButton
                name="generator"
                location="after"
                options={passwordGeneratorBtn}
              />
              <TextBoxButton
                name="password"
                location="after"
                options={passwordButton}
              />
              <Validator>
                <RequiredRule message="Password is required" />
              </Validator>
            </TextBox>
            <ValidationSummary id="summary"></ValidationSummary>
            <Button
              id="button"
              text="Register"
              type="success"
              useSubmitBehavior={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};
