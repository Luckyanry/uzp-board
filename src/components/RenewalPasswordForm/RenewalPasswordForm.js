import React, {useState, useRef, useEffect, useCallback} from "react";
import {useHistory} from "react-router-dom";

import Form, {CustomRule, Item, Label} from "devextreme-react/form";
import {TextBox, Button as TextBoxButton} from "devextreme-react/text-box";
import {
  Validator,
  RequiredRule,
  PatternRule,
  StringLengthRule,
} from "devextreme-react/validator";
import Button from "devextreme-react/button";
import notify from "devextreme/ui/notify";

import {renewalPassword} from "../../api/auth";
import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";
import {
  // ErrorPopup,
  Spinner,
} from "..";

import visibilityOff from "./icons/visibilityOff.svg";
import visibility from "./icons/visibility.svg";
import enhancedEncryption from "./icons/enhancedEncryption.svg";
import "./RenewalPasswordForm.scss";

const RenewalPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");

  const [oldPasswordValue, setOldPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");

  const [passwordMode, setPasswordMode] = useState("password");
  const [passwordVisibility, setPasswordVisibility] = useState(visibility);

  const [minLength, setMinLength] = useState(8);
  const [maxLength, setMaxLength] = useState(128);
  const [minCharacterGroups, setMinCharacterGroups] = useState(4);

  const {formatMessage} = useLocalization();
  const history = useHistory();
  const formData = useRef({});

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    const getPasswordPolicies = async () => {
      const dictionaryByName = FetchData(
        "/DictionaryByName",
        "ShortDicsRecords&@name=PasswordPolicies",
        "hbdb"
      ).passwordPolicies();

      await dictionaryByName
        .then((res) => res.data)
        .then((arr) => {
          setMinLength(arr[0].jvson.MinPasswordLength);
          setMaxLength(arr[0].jvson.MaxPasswordLength);
          setMinCharacterGroups(arr[0].jvson.MinCharacterGroups);
        })
        .catch((err) => setErrorStatus(err));

      setLoading(false);
      return;
    };

    minLength &&
      maxLength &&
      minCharacterGroups &&
      !ignore &&
      getPasswordPolicies();

    return () => {
      ignore = true;
      // getPasswordPolicies();
    };
  }, [minLength, maxLength, minCharacterGroups]);

  useEffect(() => {
    const getRenewalPassword = async () => {
      setLoading(true);

      if (!oldPasswordValue && !newPasswordValue) return;

      const result = await renewalPassword(oldPasswordValue, newPasswordValue);

      if (!result) {
        setLoading(false);

        notify(
          {
            message: formatMessage("msgErrFaildToResetPass"),
            position: {
              my: "center",
              at: "center",
              of: "#login-start-form-container",
              // of: "#content",
              offset: "0 36",
            },
            width: 426,
            height: 80,
            shading: true,
          },
          "error",
          3000
        );
        return;
      }

      const {isOk, message} = result;

      if (isOk) {
        setLoading(false);

        notify(
          {
            message: formatMessage("msgSuccessPassChange"),
            position: {
              my: "center",
              at: "center",
              of: "#content",
              // of: "#content",
              offset: "0 36",
            },
            width: 426,
            height: 80,
            shading: true,
          },
          "success",
          3000
        );

        return history.push("/login");
      }

      setErrorStatus(true);

      notify(
        {
          message: formatMessage(message),
          position: {
            my: "center",
            at: "center",
            of: "#login-start-form-container",
            // of: "#content",
            offset: "0 36",
          },
          width: 426,
          height: 80,
          shading: true,
        },
        "error",
        3000
      );

      setLoading(false);
    };

    newPasswordValue && oldPasswordValue && getRenewalPassword();

    // eslint-disable-next-line
  }, [oldPasswordValue, newPasswordValue]);

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
    type: "button",
    onClick: () => {
      setPasswordVisibility(() =>
        passwordVisibility === visibility ? visibilityOff : visibility
      );
      setPasswordMode(() => (passwordMode === "text" ? "password" : "text"));
    },
  };

  const passwordGeneratorBtn = {
    icon: enhancedEncryption,
    type: "button",
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

    setPwd(finalPassword);
    formData.current.password = finalPassword;
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

  function onNewPwdChanged(e) {
    setPwd(e.value);
    formData.current.password = e.value;
  }

  function onOldPwdChanged(e) {
    setOldPwd(e.value);
    formData.current.oldPassword = e.value;
  }

  function onConfirmPasswordChanged(e) {
    setConfirmPasswordState(e.value);
  }

  const confirmPassword = useCallback(
    ({value}) => {
      const {password} = formData.current;
      return value === password;
    },

    []
  );

  const onFormSubmit = (e) => {
    e.preventDefault();
    const {oldPassword, password} = formData.current;

    setOldPasswordValue(oldPassword);
    setNewPasswordValue(password);
  };

  const {regExp, patternRuleErrMsg} = inputValidation();

  const View = () => (
    <Form
      formData={formData.current}
      disabled={loading}
      showColonAfterLabel={false}
      showRequiredMark={false}
    >
      <Item
        dataField={"oldPassword"}
        editorType={"dxTextBox"}
        editorOptions={passwordEditorOptions}
        cssClass={"input"}
      >
        <TextBox
          mode={passwordMode}
          placeholder={formatMessage("msgEnterOldPassword")}
          stylingMode="filled"
          defaultValue={oldPwd}
          value={oldPwd}
          onValueChanged={onOldPwdChanged}
        >
          <TextBoxButton
            name={formatMessage("msgShowPassword")}
            hint={formatMessage("msgShowPassword")}
            location="after"
            options={passwordButton}
          />
        </TextBox>

        <Label visible={true} text={formatMessage("msgEnterOldPassword")} />
      </Item>

      <Item
        dataField={"password"}
        editorType={"dxTextBox"}
        editorOptions={passwordEditorOptions}
        cssClass={"input"}
      >
        <TextBox
          mode={passwordMode}
          placeholder={formatMessage("msgEnterNewPassword")}
          stylingMode="filled"
          defaultValue={pwd}
          value={pwd}
          onValueChanged={onNewPwdChanged}
        >
          <TextBoxButton
            name={formatMessage("msgShowPassword")}
            hint={formatMessage("msgShowPassword")}
            location="after"
            options={passwordButton}
          />

          <TextBoxButton
            name="msgGenerateStrongPassword"
            hint={formatMessage("msgGeneratePassword")}
            location="after"
            options={passwordGeneratorBtn}
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

        <Label visible={true} text={formatMessage("msgEnterNewPassword")} />
      </Item>

      <Item
        dataField={"confirmPassword"}
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
                comparisonTarget={password}
              /> */}
            <CustomRule
              message={formatMessage("msgPasswordNotMatch")}
              validationCallback={confirmPassword}
            />
          </Validator>
        </TextBox>

        <Label visible={true} text={formatMessage("msgConfirmPassword")} />
      </Item>

      <Item>
        <Button
          id="button"
          text={formatMessage("msgContinue")}
          type="default"
          useSubmitBehavior={true}
        />
      </Item>
    </Form>
  );

  const content = !(loading || errorStatus) ? <View /> : null;

  const spinner = loading ? (
    <Spinner loadingState={loading} positionOf={"#content"} />
  ) : null;

  return (
    <form
      id="renewal-password-form-container"
      className={"renewal-password-form"}
      onSubmit={onFormSubmit}
    >
      {spinner}
      {content}
    </form>
  );
};

export default RenewalPasswordForm;
