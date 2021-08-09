import React, {useState} from "react";

import Form from "devextreme-react/form";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./ProfilePage.scss";

export const ProfilePage = () => {
  const [notes, setNotes] = useState(
    "User1 is a CPA and has been our controller since 2008. She loves to interact with staff so if you`ve not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts."
  );
  const employee = {
    ID: 7,
    FirstName: "User1",
    LastName: "Test",
    Prefix: "Mr.",
    Position: "Controller",
    Picture: "images/employees/07.png",
    BirthDate: new Date("1974/11/15"),
    HireDate: new Date("2005/05/11"),
    Notes: notes,
    Address: "4600 N Virginia Rd.",
  };

  const {formatMessage} = useLocalization();

  return (
    <>
      <h2 className={"content-block"}>{formatMessage("profile")}</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <div className={"form-avatar"}>
          <img
            alt={""}
            src={`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/${employee.Picture}`}
          />
        </div>
        <span>{notes}</span>
      </div>

      <div className={"content-block dx-card responsive-paddings"}>
        <Form
          id={"form"}
          defaultFormData={employee}
          onFieldDataChanged={(e) =>
            e.dataField === "Notes" && setNotes(e.value)
          }
          labelLocation={"top"}
          colCountByScreen={colCountByScreen}
        />
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
