import React, {useEffect, useState} from "react";

import {TextBox, Button as TextBoxButton} from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import ValidationSummary from "devextreme-react/validation-summary";
import {
  Validator,
  RequiredRule,
  CompareRule,
  // PatternRule,
  // StringLengthRule,
  // RangeRule,
  // AsyncRule
} from "devextreme-react/validator";
import notify from "devextreme/ui/notify";

import "./PasswordGenerator.scss";

// import {useLocalization} from "../../contexts/LocalizationContext";

import {FetchData} from "../../api/pages-fetch";

export const PasswordGenerator = () => {
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [passwordMode, setPasswordMode] = useState("password");
  const [passwordFetchRules, setPasswordFetchRules] = useState(null);
  const [minLength, setMinLength] = useState(8);
  const [maxLength, setMaxLength] = useState(128);
  const [hasLower, setHasLower] = useState(true);
  const [hasUpper, setHasUpper] = useState(true);
  const [hasNumber, setHasNumber] = useState(true);
  const [hasSymbol, setHasSymbol] = useState(true);

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
      const newPassword = generatorPassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        minLength
      );

      setConfirmPasswordState(newPassword);
    },
  };

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  useEffect(() => {
    dictionaryByName
      ._loadFunc()
      .then((res) => res.data)
      .then((arr) => setPasswordFetchRules(arr[0].jvson));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(`Profile passwordFetchRules`, passwordFetchRules);

  function onPasswordChanged(e) {
    setPasswordState(e.value);
  }

  function onConfirmPasswordChanged(e) {
    setConfirmPasswordState(e.value);
  }

  function passwordComparison() {
    return passwordState;
  }

  function onFormSubmit(e) {
    notify(
      {
        message: "You have submitted the form",
        position: {
          my: "center top",
          at: "center top",
        },
      },
      "success",
      3000
    );

    e.preventDefault();
  }

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = '!"#$%&()*+,-./:;<=>?@[]^_`{|}~(';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function generatorPassword(lower, upper, number, symbol, length) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typeArr = [{lower}, {upper}, {number}, {symbol}].filter(
      (item) => Object.values(item)[0]
    );

    // console.log(`typesCount`, typesCount);
    // console.log(`typeArr`, typeArr);

    if (typesCount === 0) {
      return "";
    }

    for (let i = 0; i < length; i += typesCount) {
      // eslint-disable-next-line no-loop-func
      typeArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    const finalPassword = generatedPassword.slice(0, length);
    // console.log(`finalPassword`, finalPassword);
    setPasswordState(finalPassword);
    return finalPassword;
  }

  return (
    <div className="dx-fieldset">
      <form action="your-action" onSubmit={onFormSubmit}>
        <div className="dx-fieldset">
          <div className="dx-field">
            {/* <div className="dx-field-label">
              <h6>Password: </h6>
            </div> */}
            <div className="dx-field-value">
              <TextBox
                mode={passwordMode}
                placeholder="Enter password"
                stylingMode="filled"
                // defaultValue="F5lzKs$0T"
                defaultValue={passwordState}
                onValueChanged={onPasswordChanged}
                value={passwordState}
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
            </div>
          </div>

          <div className="dx-field">
            {/* <div className="dx-field-label">
              <h6>Confirm Password</h6>
            </div> */}
            <div className="dx-field-value">
              <TextBox
                mode={passwordMode}
                placeholder="Confirm password"
                stylingMode="filled"
                value={confirmPasswordState}
                onValueChanged={onConfirmPasswordChanged}
              >
                <TextBoxButton
                  name="password"
                  location="after"
                  options={passwordButton}
                />

                <Validator>
                  <RequiredRule message="Confirm Password is required" />
                  <CompareRule
                    message="Password and Confirm Password do not match"
                    comparisonTarget={passwordComparison}
                  />
                </Validator>
              </TextBox>
            </div>
          </div>
        </div>

        <div className="dx-btn-fieldset">
          <ValidationSummary id="summary"></ValidationSummary>
          <Button
            id="button"
            text="Submit"
            type="success"
            useSubmitBehavior={true}
          />
        </div>
      </form>
    </div>
  );
};
