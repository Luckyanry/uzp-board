import React, {useEffect, useState} from "react";

import {TextBox, Button as TextBoxButton} from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import ValidationSummary from "devextreme-react/validation-summary";
import {
  Validator,
  RequiredRule,
  CompareRule,
  PatternRule,
  StringLengthRule,
  // RangeRule,
  // AsyncRule
} from "devextreme-react/validator";
import notify from "devextreme/ui/notify";

import "./PasswordGenerator.scss";

import {useLocalization} from "../../contexts/LocalizationContext";

import {FetchData} from "../../api/pages-fetch";
// import {func} from "prop-types";

export const PasswordGenerator = () => {
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [passwordMode, setPasswordMode] = useState("password");
  const [minLength, setMinLength] = useState(8);
  const [maxLength, setMaxLength] = useState(128);
  const [minCharacterGroups, setMinCharacterGroups] = useState(4);

  const dictionaryByName = FetchData("/DictionaryByName").fetchData;
  const {formatMessage} = useLocalization();

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
      const {setLower, setUpper, setNumber, setSymbol} = inputValidation();

      const newPassword = generatorPassword(
        setLower,
        setUpper,
        setNumber,
        setSymbol,
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
      .then((arr) => {
        setMinLength(arr[0].jvson.MinPasswordLength);
        setMaxLength(arr[0].jvson.MaxPasswordLength);
        setMinCharacterGroups(arr[0].jvson.MinCharacterGroups);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    console.log(`inputValidation`, inputValidation());
    notify(
      {
        message: formatMessage("submit_notify"),
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
    const symbols = `!"#$%&()*+,-./:;<=>?@[]^_{|}~`;
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function generatorPassword(
    lower = true,
    upper = false,
    number = false,
    symbol = false,
    length
  ) {
    let generatedPassword = "";

    const typesCount = lower + upper + number + symbol;

    const typeArr = [{lower}, {upper}, {number}, {symbol}]
      .map((i) => [Math.random(), i])
      .sort()
      .map((i) => i[1])
      .filter((item) => Object.values(item)[0]);

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

    setPasswordState(finalPassword);
    return finalPassword;
  }

  function inputValidation() {
    const digitsRule = "0-9";
    const symbolRule = String.raw`\!\"\#\$\%\&\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\]\^\_\{\|\}\~`;
    const lowerLetterRule = "a-z";
    const upperLetterRule = "A-Z";

    switch (minCharacterGroups) {
      case 1:
        return {
          setLower: true,
          patternRuleErrMsg: formatMessage("pattern_rule_err_msg_1"),
          regExp: `^(?=.*[${lowerLetterRule}])[${lowerLetterRule}]{${minLength},${maxLength}}$`,
        };
      case 2:
        return {
          setLower: true,
          setUpper: true,
          patternRuleErrMsg: formatMessage("pattern_rule_err_msg_2"),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])[${lowerLetterRule}${upperLetterRule}]{${minLength},${maxLength}}$`,
        };
      case 3:
        return {
          setLower: true,
          setUpper: true,
          setNumber: true,
          patternRuleErrMsg: formatMessage("pattern_rule_err_msg_3"),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])(?=.*[${digitsRule}])[${lowerLetterRule}${upperLetterRule}${digitsRule}]{${minLength},${maxLength}}$`,
        };
      case 4:
        return {
          setLower: true,
          setUpper: true,
          setNumber: true,
          setSymbol: true,
          patternRuleErrMsg: formatMessage("pattern_rule_err_msg_4"),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])(?=.*[${digitsRule}])(?=.*[${symbolRule}])[${lowerLetterRule}${upperLetterRule}${digitsRule}${symbolRule}]{${minLength},${maxLength}}$`,
        };

      default:
        return {
          setLower: true,
          setUpper: true,
          setNumber: true,
          setSymbol: true,
          patternRuleErrMsg: formatMessage("pattern_rule_err_msg_4"),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])(?=.*[${digitsRule}])(?=.*[${symbolRule}])[${lowerLetterRule}${upperLetterRule}${digitsRule}${symbolRule}]{${minLength},${maxLength}}$`,
        };
    }
  }

  const {regExp, patternRuleErrMsg} = inputValidation();

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
                placeholder={formatMessage("enter_password")}
                stylingMode="filled"
                defaultValue={passwordState}
                onValueChanged={onPasswordChanged}
                value={passwordState}
              >
                <TextBoxButton
                  name={formatMessage("generate_password")}
                  location="after"
                  options={passwordGeneratorBtn}
                />

                <TextBoxButton
                  name={formatMessage("show_password")}
                  location="after"
                  options={passwordButton}
                />

                <Validator>
                  <RequiredRule message={formatMessage("required_password")} />

                  <StringLengthRule
                    message={formatMessage(
                      "string_length_rule_err_msg",
                      minLength,
                      maxLength
                    )}
                    min={minLength}
                    max={maxLength}
                  />

                  <PatternRule message={patternRuleErrMsg} pattern={regExp} />
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
                placeholder={formatMessage("confirm_password")}
                stylingMode="filled"
                value={confirmPasswordState}
                onValueChanged={onConfirmPasswordChanged}
              >
                <TextBoxButton
                  name={formatMessage("show_password")}
                  location="after"
                  options={passwordButton}
                />

                <Validator>
                  <RequiredRule
                    message={formatMessage("confirm_required_password")}
                  />

                  <CompareRule
                    message={formatMessage("password_not_match")}
                    comparisonTarget={passwordComparison}
                  />
                </Validator>
              </TextBox>
            </div>
          </div>
        </div>

        <div className="dx-btn-fieldset">
          <ValidationSummary id="summary" />
          <Button
            id="button"
            text={formatMessage("submit")}
            type="success"
            useSubmitBehavior={true}
          />
        </div>
      </form>
    </div>
  );
};
