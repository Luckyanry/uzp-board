import React, {useState} from "react";

import Form, {SimpleItem, Label, Item} from "devextreme-react/form";

import {useLocalization} from "../../contexts/LocalizationContext";
import {PasswordGenerator} from "../../components";

import "./ProfilePage.scss";

export const ProfilePage = () => {
  const [notes, setNotes] = useState("Ivan has been our designer since 2010.");

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

  return (
    <>
      <h2 className={"content-block"}>
        {formatMessage("msgProfileMenuTitle")}
      </h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <div className={"form-avatar"}>
          <img
            alt={""}
            src={`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/${employee.Picture}`}
          />
        </div>
        <span>{notes}</span>
      </div>
      <PasswordGenerator />

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
        </Form>
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
