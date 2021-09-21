import React, {useEffect, useState, useCallback} from "react";

import Form, {CustomRule, Item, Label} from "devextreme-react/form";
import {TextBox, Button as TextBoxButton} from "devextreme-react/text-box";
import {
  Validator,
  RequiredRule,
  PatternRule,
  StringLengthRule,
} from "devextreme-react/validator";
import Button from "devextreme-react/button";
// import ValidationSummary from "devextreme-react/validation-summary";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";

import visibilityOff from "./icons/visibilityOff.svg";
import visibility from "./icons/visibility.svg";
import enhancedEncryption from "./icons/enhancedEncryption.svg";
import "./PasswordGenerator.scss";

const PasswordGenerator = ({formData, onSubmit, loadingState}) => {
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const [passwordMode, setPasswordMode] = useState("password");
  const [passwordVisibility, setPasswordVisibility] = useState(visibility);
  const [minLength, setMinLength] = useState(8);
  const [maxLength, setMaxLength] = useState(128);
  const [minCharacterGroups, setMinCharacterGroups] = useState(4);

  const {formatMessage} = useLocalization();

  const passwordEditorOptions = {
    stylingMode: "filled",
    placeholder: formatMessage("msgEnterPassword"),
    mode: "password",
    elementAttr: {class: "form-input"},
    height: 64,
  };

  const confirmedPasswordEditorOptions = {
    stylingMode: "filled",
    placeholder: formatMessage("msgConfirmPassword"),
    mode: "password",
    elementAttr: {class: "form-input"},
    height: 64,
  };

  const passwordButton = {
    icon: passwordVisibility,
    type: "default",
    onClick: () => {
      setPasswordVisibility(() =>
        passwordVisibility === visibility ? visibilityOff : visibility
      );
      setPasswordMode(() => (passwordMode === "text" ? "password" : "text"));
    },
  };

  const passwordGeneratorBtn = {
    icon: enhancedEncryption,
    type: "default",
    onClick: () => {
      const {setLower, setUpper, setNumber, setSymbol} = inputValidation();

      const newPassword = passwordGenerator(
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
    const dictionaryByName = FetchData(
      "/DictionaryByName",
      "ShortDicsRecords&@name=PasswordPolicies",
      "hbdb"
    ).fetchColumnsSchemaData;

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
    formData.password = e.value;
  }

  function onConfirmPasswordChanged(e) {
    setConfirmPasswordState(e.value);
  }

  // function passwordComparison() {
  //   return passwordState;
  // }

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
    const symbols = `ˆ"'.:;!#$%&()*+-/<=>?@[]_{|}~`;
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function passwordGenerator(
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
    formData.password = finalPassword;
    return finalPassword;
  }

  function inputValidation() {
    const digitsRule = "0-9";
    const symbolRule = String.raw`\ˆ\"\'\.\:\;\!\#\$\%\&\(\)\*\+\-\/\<\=\>\?\@\[\]\_\{\|\}\~`;
    const lowerLetterRule = "a-z";
    const upperLetterRule = "A-Z";

    switch (minCharacterGroups) {
      case 1:
        return {
          setLower: true,
          patternRuleErrMsg: formatMessage("msgPwdPatternRuleErrMsgOneGroup"),
          regExp: `^(?=.*[${lowerLetterRule}])[${lowerLetterRule}]{${minLength},${maxLength}}$`,
        };
      case 2:
        return {
          setLower: true,
          setUpper: true,
          patternRuleErrMsg: formatMessage("msgPwdPatternRuleErrMsgTwoGroups"),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])[${lowerLetterRule}${upperLetterRule}]{${minLength},${maxLength}}$`,
        };
      case 3:
        return {
          setLower: true,
          setUpper: true,
          setNumber: true,
          patternRuleErrMsg: formatMessage(
            "msgPwdPatternRuleErrMsgThreeGroups"
          ),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])(?=.*[${digitsRule}])[${lowerLetterRule}${upperLetterRule}${digitsRule}]{${minLength},${maxLength}}$`,
        };
      case 4:
        return {
          setLower: true,
          setUpper: true,
          setNumber: true,
          setSymbol: true,
          patternRuleErrMsg: formatMessage("msgPwdPatternRuleErrMsgFourGroups"),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])(?=.*[${digitsRule}])(?=.*[${symbolRule}])[${lowerLetterRule}${upperLetterRule}${digitsRule}${symbolRule}]{${minLength},${maxLength}}$`,
        };

      default:
        return {
          setLower: true,
          setUpper: true,
          setNumber: true,
          setSymbol: true,
          patternRuleErrMsg: formatMessage("msgPwdPatternRuleErrMsgFourGroups"),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])(?=.*[${digitsRule}])(?=.*[${symbolRule}])[${lowerLetterRule}${upperLetterRule}${digitsRule}${symbolRule}]{${minLength},${maxLength}}$`,
        };
    }
  }

  const {regExp, patternRuleErrMsg} = inputValidation();

  const confirmPassword = useCallback(
    ({value}) => value === formData.password,
    // eslint-disable-next-line
    []
  );

  return (
    <form
      id="change-password-form-container"
      className={"change-password-form"}
      onSubmit={onSubmit}
    >
      <Form
        formData={formData}
        disabled={loadingState}
        showColonAfterLabel={false}
        showRequiredMark={false}
      >
        <Item
          dataField={"password"}
          editorType={"dxTextBox"}
          editorOptions={passwordEditorOptions}
          cssClass={"input"}
        >
          <TextBox
            mode={passwordMode}
            placeholder={formatMessage("msgEnterPassword")}
            stylingMode="filled"
            defaultValue={passwordState}
            onValueChanged={onPasswordChanged}
            value={passwordState}
            // value={passwordState}
          >
            <TextBoxButton
              name="msgGenerateStrongPassword"
              // name={formatMessage("msgGeneratePassword")}
              location="after"
              options={passwordGeneratorBtn}
            />

            <TextBoxButton
              name={formatMessage("msgShowPassword")}
              location="after"
              options={passwordButton}
            />

            <Validator>
              <RequiredRule message={formatMessage("msgRequiredPassword")} />

              <StringLengthRule
                message={formatMessage(
                  "msgPwdStringLengthRuleErrMsg",
                  minLength,
                  maxLength
                )}
                min={minLength}
                max={maxLength}
              />

              <PatternRule message={patternRuleErrMsg} pattern={regExp} />
            </Validator>
          </TextBox>

          <Label visible={true} />
        </Item>

        <Item
          dataField={"confirmedPassword"}
          editorType={"dxTextBox"}
          editorOptions={confirmedPasswordEditorOptions}
          ssClass={"input"}
        >
          <TextBox
            mode={passwordMode}
            placeholder={formatMessage("msgConfirmPassword")}
            stylingMode="filled"
            value={confirmPasswordState}
            onValueChanged={onConfirmPasswordChanged}
          >
            <TextBoxButton
              name={formatMessage("msgShowConfirmedPassword")}
              location="after"
              options={passwordButton}
            />

            <Validator>
              <RequiredRule
                message={formatMessage("msgConfirmRequiredPassword")}
              />

              {/* <CompareRule
                message={formatMessage("msgPasswordNotMatch")}
                comparisonTarget={passwordState}
              /> */}
              <CustomRule
                message={formatMessage("msgPasswordNotMatch")}
                validationCallback={confirmPassword}
              />
            </Validator>
          </TextBox>

          <Label visible={true} />
        </Item>

        <Item>
          <Button
            id="button"
            text={formatMessage("msgContinue")}
            type="default"
            useSubmitBehavior={true}
          />
          {/* <ValidationSummary id="summary" /> */}
        </Item>
      </Form>
    </form>
  );
};

export default PasswordGenerator;
