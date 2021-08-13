import React, {useEffect, useState} from "react";

import TreeList, {
  Column,
  SearchPanel,
  HeaderFilter,
  Editing,
  RequiredRule,
  Paging,
  Pager,
  Scrolling,
  FilterRow,
  Lookup as LookupTreeList,
} from "devextreme-react/tree-list";
import {Lookup, DropDownOptions} from "devextreme-react/lookup";
import Button from "devextreme-react/button";

// import {soatoData} from "../../api/soato-fetch";
import {FetchData} from "../../api/pages-fetch";
// import {soatoLookData} from "../../api/soato-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./SoatoPage.scss";

const employees = [
  {
    ID: 1,
    FirstName: "John",
    LastName: "Heart",
    Prefix: "Mr.",
    Position: "CEO",
    Picture:
      "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png",
    BirthDate: "1964/03/16",
    HireDate: "1995/01/15",
    Notes:
      "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
    Address: "351 S Hill St.",
  },
  {
    ID: 2,
    FirstName: "Olivia",
    LastName: "Peyton",
    Prefix: "Mrs.",
    Position: "Sales Assistant",
    Picture:
      "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/09.png",
    BirthDate: "1981/06/03",
    HireDate: "2012/05/14",
    Notes:
      "Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.",
    Address: "807 W Paseo Del Mar",
  },
  {
    ID: 3,
    FirstName: "Robert",
    LastName: "Reagan",
    Prefix: "Mr.",
    Position: "CMO",
    Picture:
      "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/03.png",
    BirthDate: "1974/09/07",
    HireDate: "2002/11/08",
    Notes:
      "Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team.\r\n\r\nRobert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.",
    Address: "4 Westmoreland Pl.",
  },
  {
    ID: 4,
    FirstName: "Greta",
    LastName: "Sims",
    Prefix: "Ms.",
    Position: "HR Manager",
    Picture:
      "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/04.png",
    BirthDate: "1977/11/22",
    HireDate: "1998/04/23",
    Notes:
      "Greta has been DevAV's HR Manager since 2003. She joined DevAV from Sonee Corp.\r\n\r\nGreta is currently training for the NYC marathon. Her best marathon time is 4 hours. Go Greta.",
    Address: "1700 S Grandview Dr.",
  },
  {
    ID: 5,
    FirstName: "Brett",
    LastName: "Wade",
    Prefix: "Mr.",
    Position: "IT Manager",
    Picture:
      "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/05.png",
    BirthDate: "1968/12/01",
    HireDate: "2009/03/06",
    Notes:
      "Brett came to DevAv from Microsoft and has led our IT department since 2012.\r\n\r\nWhen he is not working hard for DevAV, he coaches Little League (he was a high school pitcher).",
    Address: "1120 Old Mill Rd.",
  },
  {
    ID: 6,
    FirstName: "Sandra",
    LastName: "Johnson",
    Prefix: "Mrs.",
    Position: "Controller",
    Picture:
      "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png",
    BirthDate: "1974/11/15",
    HireDate: "2005/05/11",
    Notes:
      "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you've not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.",
    Address: "4600 N Virginia Rd.",
  },
  {
    ID: 7,
    FirstName: "Kevin",
    LastName: "Carter",
    Prefix: "Mr.",
    Position: "Shipping Manager",
    Picture:
      "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/07.png",
    BirthDate: "1978/01/09",
    HireDate: "2009/08/11",
    Notes:
      "Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months.\r\n\r\nWhen not in the office, he is usually on the basketball court playing pick-up games.",
    Address: "424 N Main St.",
  },
  {
    ID: 8,
    FirstName: "Cynthia",
    LastName: "Stanwick",
    Prefix: "Ms.",
    Position: "HR Assistant",
    Picture:
      "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/08.png",
    BirthDate: "1985/06/05",
    HireDate: "2008/03/24",
    Notes:
      "Cindy joined us in 2008 and has been in the HR department for 2 years. \r\n\r\nShe was recently awarded employee of the month. Way to go Cindy!",
    Address: "2211 Bonita Dr.",
  },
  {
    ID: 9,
    FirstName: "Kent",
    LastName: "Samuelson",
    Prefix: "Dr.",
    Position: "Ombudsman",
    Picture:
      "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/02.png",
    BirthDate: "1972/09/11",
    HireDate: "2009/04/22",
    Notes:
      "As our ombudsman, Kent is on the front-lines solving customer problems and helping our partners address issues out in the field.    He is a classically trained musician and is a member of the Chamber Orchestra.",
    Address: "12100 Mora Dr",
  },
];

export const SoatoPage = () => {
  const [toggler, setToggler] = useState(false);
  const [lookupData, setLookupData] = useState(null);
  const [selecteLookupName, setSelecteLookupName] = useState(null);

  const {formatMessage} = useLocalization();
  const soatoFetchData = FetchData(window.location.hash).soatoFetchData;
  const soatoLookData = FetchData(window.location.hash).soatoLookData;

  const defaultStatus = ["Active", "Deactivated"];
  const statusesLang = defaultStatus.map((statusLang) => {
    const statusLanguage = formatMessage(statusLang);
    return statusLanguage;
  });

  const popupOpt = {
    title: formatMessage("new_row"),
    showTitle: true,
    width: 950,
    height: 780,
  };

  function clickHandler() {
    setToggler((toggler) => !toggler);

    if (toggler) {
      window.location.reload();
    }
  }

  console.log(`soatoLookData => `, lookupData);
  console.log(`employees => `, employees);

  function onValueChanged(e) {
    console.log(`e `, e);
    setSelecteLookupName(e.value);
  }

  function getDisplayExpr(item) {
    console.log(`item `, item);
    // return item ? `${item.FirstName} ${item.LastName}` : "";
    return item ? `${item.pid} ${item.name}` : "";
  }

  useEffect(() => {
    soatoLookData
      ._loadFunc()
      .then((res) => res.data)
      .then((arr) => setLookupData(arr));
  }, []);

  return (
    <div className="soato-page-wrapper">
      <h2 className={"content-block"}>{formatMessage("soato_title")}</h2>

      <Button
        className="btn"
        icon="hierarchy"
        stylingMode="outlined"
        text={formatMessage("expand")}
        onClick={clickHandler}
      />

      <TreeList
        dataSource={soatoFetchData}
        rootValue={0}
        keyExpr="id"
        parentIdExpr="pid"
        defaultExpandedRowKeys={[1, 2]}
        showRowLines={true}
        columnAutoWidth={true}
        wordWrapEnabled={true}
        autoExpandAll={toggler}
        focusedRowEnabled={true}
        allowColumnResizing={true}
        columnHidingEnabled={true}
        rowAlternationEnabled={false}
        hoverStateEnabled={true}
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} allowSearch={true} />
        <FilterRow visible={true} />

        <Editing
          mode="popup"
          popup={popupOpt}
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
        />

        <Column
          dataField="territory_name_rus"
          caption={formatMessage("territory_name_rus")}
          minWidth={250}
        >
          <RequiredRule />
        </Column>

        <Column
          dataField="name"
          caption={formatMessage("territory_name_rus")}
          minWidth={250}
        >
          {/* <RequiredRule /> */}
        </Column>
        <Column
          dataField="pid"
          caption={formatMessage("as_child_of")}
          visible={false}
        />
        {/* <Lookup
            // items={statusesLang}
            // defaultValue={statusesLang[0]}
            value={selecteLookupName}
            items={soatoLookData}
            displayExpr={getDisplayExpr}
            placeholder="Select name"
            // onValueChanged={onValueChanged}
          >
            <DropDownOptions showTitle={false} />
          </Lookup> */}
        {/* </Column> */}

        <Column dataField="code" caption={formatMessage("code")}>
          <RequiredRule />
        </Column>

        <Column dataField="status" caption={formatMessage("status")}>
          <LookupTreeList dataSource={statusesLang} />
          <RequiredRule />
        </Column>

        <Column
          dataField="territory_name_eng"
          caption={formatMessage("territory_name_eng")}
          visible={false}
        />
        <Column
          dataField="territory_name_uzlat"
          caption={formatMessage("territory_name_uzlat")}
          visible={false}
        />
        <Column
          dataField="territory_name_uzcyr"
          caption={formatMessage("territory_name_uzcyr")}
          visible={false}
        />
        <Column
          dataField="territory_name_karlat"
          caption={formatMessage("territory_name_karlat")}
          visible={false}
        />
        <Column
          dataField="admin_centre_rus"
          caption={formatMessage("admin_centre_rus")}
          visible={false}
        />
        <Column
          dataField="admin_centre_eng"
          caption={formatMessage("admin_centre_eng")}
          visible={false}
        />
        <Column
          dataField="admin_centre_uzlat"
          caption={formatMessage("admin_centre_uzlat")}
          visible={false}
        />
        <Column
          dataField="admin_centre_uzcyr"
          caption={formatMessage("admin_centre_uzcyr")}
          visible={false}
        />
        <Column
          dataField="admin_centre_karlat"
          caption={formatMessage("admin_centre_karlat")}
          visible={false}
        />

        <Paging defaultPageSize={10} enabled={true} />
        <Pager
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
          allowedPageSizes={[10, 20, 50, 100, "all"]}
          showAllItem={true}
          visible={true}
        />
      </TreeList>

      <Lookup
        // items={statusesLang}
        // defaultValue={statusesLang[0]}
        value={selecteLookupName}
        // items={lookupData}
        displayExpr={getDisplayExpr}
        placeholder="Select name"
        onValueChanged={onValueChanged}
      >
        <DropDownOptions showTitle={false} />
      </Lookup>
    </div>
  );
};
