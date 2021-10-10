import React, {useRef, useState} from "react";

import Form, {SimpleItem, Label, Item} from "devextreme-react/form";
// import {TextBox, Button as TextBoxButton} from "devextreme-react/text-box";

import {useLocalization} from "../../contexts/LocalizationContext";
import {
  // ColumnPwdGeneratorField,
  PasswordGenerator,
} from "../../components";

import "./ProfilePage.scss";

export const ProfilePage = () => {
  const [notes, setNotes] = useState("Ivan has been our designer since 2010.");
  // const [loading, setLoading] = useState(false);
  // const [password, setPassword] = useState(null);

  const formData = useRef({});
  const {formatMessage} = useLocalization();

  const employee = {
    ID: 87,
    FirstName: "Ivan",
    LastName: "Pupkin",
    Prefix: "Mr.",
    Position: "Designer",
    Picture: "images/employees/07.png",
    BirthDate: new Date("1974/11/15"),
    HireDate: new Date("2010/05/11"),
    Notes: notes,
    Address: "04112, Kyiv, Ukraine",
  };

  // const onSubmit = () => {
  //   setLoading(true);
  //   const {password} = formData.current;

  //   setPassword(password);
  //   setLoading(false);
  // };

  return (
    <>
      <h2 className={"content-block"}>
        {formatMessage("msgProfileMenuTitle")}
      </h2>

      {/* <div className={"content-block dx-card responsive-paddings"}>
        <div className={"form-avatar"}>
          <img
            alt={""}
            src={`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/${employee.Picture}`}
          />
        </div>
        <span>{notes}</span>
      </div> */}

      <div className={"content-block dx-card responsive-paddings"}>
        <Form
          id={"form"}
          defaultFormData={employee}
          onFieldDataChanged={(e) =>
            e.dataField === "Notes" && setNotes(e.value)
          }
          labelLocation={"top"}
          colCountByScreen={colCountByScreen}
        >
          <SimpleItem dataField="ID" isRequired={true} />
          <SimpleItem dataField="FirstName" isRequired={true}>
            <Label text={formatMessage("msgFirstName")} />
          </SimpleItem>
          <SimpleItem dataField="LastName" isRequired={true}>
            <Label text={formatMessage("msgLastName")} />
          </SimpleItem>
          <SimpleItem dataField="Prefix">
            <Label text={formatMessage("msgPrefix")} />
          </SimpleItem>
          <SimpleItem dataField="Position">
            <Label text={formatMessage("msgPosition")} />
          </SimpleItem>
          <SimpleItem dataField="BirthDate" isRequired={true}>
            <Label text={formatMessage("msgBirthDate")} />
          </SimpleItem>
          <SimpleItem dataField="HireDate" isRequired={true}>
            <Label text={formatMessage("msgHireDate")} />
          </SimpleItem>
          <SimpleItem dataField="Address" isRequired={true}>
            <Label text={formatMessage("msgAddress")} />
          </SimpleItem>
          <Item dataField="Notes">
            <Label text={formatMessage("msgNotes")} />
          </Item>
          {/* <ColumnPwdGeneratorField /> */}
        </Form>
        <div className={"passwors-generator"}>
          <PasswordGenerator
            // onSubmit={onSubmit}
            // loadingState={loading}
            formData={formData.current}
          />
        </div>
      </div>
    </>
  );
};

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
};
