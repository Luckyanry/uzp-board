import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  SearchPanel,
  // HeaderFilter,
  FilterRow,
  Scrolling,
  ColumnChooser,
  Editing,
  MasterDetail,
  Column,
  RequiredRule,
  // PatternRule,
  FormItem,
  Lookup,
  Button,
  Paging,
  Pager,
  Form,
} from "devextreme-react/data-grid";
// import {Item} from "devextreme-react/form";
import {
  SimpleItem,
  GroupItem,
  TabbedItem,
  TabPanelOptions,
  Tab,
  EmptyItem,
} from "devextreme-react/form";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";
import {DetailTemplate} from "../../components/DetailTemplate/DetailTemplate";

import "./DataGridTypePage.scss";

export const DataGridTypePage = ({location: {pathname}}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);
  const [lookDataState, setLookDataState] = useState(null);
  const [userDataGID, setUserDataGID] = useState("");
  const [userFormData, setUserFormData] = useState(null);
  const [userRolesFormData, setUserRolesFormData] = useState(null);
  // const [allUserRoles, setAllUserRoles] = useState(null);

  const {formatMessage} = useLocalization();

  const pathnameWithoutSlash = pathname.split("/")[1];
  const localPathname = createCustomMsg(pathnameWithoutSlash);

  const localPageAbbreviation = formatMessage(
    customPageAbbreviationMsg(pathnameWithoutSlash)
  );

  const popupGeneralOptions = {
    title: formatMessage("msgCreateNewItem", localPageAbbreviation),
    showTitle: true,
    width: 1000,
    height: 700,
  };

  const popupUsersPageOptions = {
    title: formatMessage("msgCreateNewItem", localPageAbbreviation),
    showTitle: false,
    width: 1000,
    height: 700,
  };

  useEffect(() => {
    // const spForURL = firstLetterToUpper(pathnameWithoutSlash);
    async function getColumnsSchemaData() {
      const fetchColumnsSchemaData = FetchData(
        pathname,
        formatMessage,
        null,
        pathnameWithoutSlash,
        "hbdb"
      ).fetchData;

      const result = await fetchColumnsSchemaData
        ._loadFunc()
        .then((res) => res.data);

      setColumnsSchemaData(result);
      getAPIData(pathnameWithoutSlash);

      const lookupSpForURL = getSpForURLFromLookup(result);

      if (lookupSpForURL) {
        getLookDataState(lookupSpForURL);
      }
    }

    function getAPIData(spForURL) {
      if (
        checkIfArrIncludesValue(
          ["userObjects", "roleObjects", "groupObjects"],
          pathnameWithoutSlash
        )
      ) {
        const usersFetchData = FetchData(
          pathname,
          formatMessage,
          null,
          spForURL,
          "wisdb"
        ).usersFetchData;

        setAPIData(usersFetchData);
      } else if (
        checkIfArrIncludesValue(
          ["personObjects", "orgUnits", "employees", "legals"],
          pathnameWithoutSlash
        )
      ) {
        const fetchData = FetchData(
          pathname,
          formatMessage,
          null,
          spForURL,
          "odb"
        ).personFetchData;

        setAPIData(fetchData);
      } else {
        const fetchData = FetchData(
          pathname,
          formatMessage,
          null,
          spForURL,
          "hbdb"
        ).fetchColumnsSchemaData;

        setAPIData(fetchData);
      }
    }

    async function getLookDataState(spForURL) {
      const lookData = FetchData(
        pathname,
        formatMessage,
        null,
        spForURL
      ).lookData;

      const result = await lookData._loadFunc().then((res) => res.data);

      setLookDataState(result);
    }

    getColumnsSchemaData();

    pathnameWithoutSlash === "ShortDics" &&
      getLookDataState(pathnameWithoutSlash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getUserRolesFormData() {
      const usersFetchData = FetchData(
        pathname,
        formatMessage,
        null,
        `w_DisplayUserRoles&@GID=${userDataGID}`,
        "wisdb"
      ).usersFetchData;

      const result = await usersFetchData._loadFunc().then((res) => res.data);

      setUserRolesFormData(result);
    }

    checkIfArrIncludesValue(
      ["userObjects", "roleObjects", "groupObjects"],
      pathnameWithoutSlash
    ) &&
      userDataGID &&
      getUserRolesFormData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataGID]);

  function statusesLang() {
    const defaultStatus = ["msgStatusActive", "msgStatusDeactivated"];
    const statusLanguage = defaultStatus.map((statusLang) =>
      formatMessage(statusLang)
    );
    return statusLanguage;
  }

  function initNewRow(e) {
    e.data.status = statusesLang()[0];
    // e.element.title = formatMessage("msgCreateNewItem", localPageAbbreviation);
  }

  function firstLetterToUpper(message) {
    return `${message[0].toUpperCase()}${message.slice(1)}`;
  }

  function createCustomMsg(message) {
    return `msg${firstLetterToUpper(message)}`;
  }

  function customPageAbbreviationMsg(message) {
    return `msg${firstLetterToUpper(message)}Abbreviation`;
  }

  function getSpForURLFromLookup(data) {
    const findLookup = data.find((item) => item.lookup);

    if (findLookup) {
      const getIsfetchField = findLookup.lookup.isfetch;
      return getIsfetchField.split(".")[2];
    } else {
      return;
    }
  }

  function checkIfArrIncludesValue(arr, value) {
    return arr.includes(value);
  }

  function customMarkupRender() {
    let murkupCollection = [];

    // if (pathnameWithoutSlash === "soogu") {
    //   const pageTitleCollection = [
    //     {
    //       dataField: "id",
    //       caption: "msgId",
    //       visible: true,
    //       disabled: true,
    //       required: false,
    //       width: 60,
    //       alignment: "right",
    //       formItem: true,
    //     },
    //     {
    //       dataField: "name_rus",
    //       caption: "msgNameRus",
    //       required: true,
    //       width: "100%",
    //     },
    //     {
    //       dataField: "name_uzcyr",
    //       caption: "msgNameUzcyr",
    //       visible: false,
    //       width: "100%",
    //     },
    //     {
    //       dataField: "name_uzlat",
    //       caption: "msgNameUzlat",
    //       visible: false,
    //       width: "100%",
    //     },
    //     {
    //       dataField: "name_karlat",
    //       caption: "msgNameKarlat",
    //       visible: false,
    //       width: "100%",
    //     },
    //     {
    //       dataField: "name_eng",
    //       caption: "msgNameEng",
    //       visible: false,
    //       width: "100%",
    //     },
    //   ];

    //   murkupCollection = [...pageTitleCollection];
    // }

    // if (pathnameWithoutSlash === "countries") {
    //   const pageTitleCollection = [
    //     {
    //       dataField: "id",
    //       caption: "msgId",
    //       visible: true,
    //       disabled: true,
    //       width: 60,
    //       alignment: "right",
    //       formItem: true,
    //     },
    //     {
    //       dataField: "short_name",
    //       caption: "msgShortName",
    //       visible: false,
    //       required: true,
    //       width: "100%",
    //     },
    //     {dataField: "short_name_rus", caption: "msgShortNameRus", required: true},
    //     {dataField: "short_name_uzcyr", caption: "msgShortNameUzcyr"},
    //     {dataField: "short_name_uzlat", caption: "msgShortNameUzlat"},
    //     {dataField: "short_name_karlat", caption: "msgShortNameKarlat"},
    //     {dataField: "short_name_eng", caption: "msgShortNameEng"},
    //   ];

    //   murkupCollection = [...pageTitleCollection];
    // }

    checkIfArrIncludesValue(
      [
        "countries",
        "mihalla",
        "soogu",
        "userObjects",
        "roleObjects",
        "groupObjects",
        "personObjects",
        "orgUnits",
        "employees",
        "legals",
      ],
      pathnameWithoutSlash
    ) && (murkupCollection = columnsSchemaData);

    if (pathnameWithoutSlash === "ShortDics") {
      const pageTitleCollection = [
        {
          dataField: "id",
          caption: "msgId",
          visible: false,
          disabled: true,
          width: 60,
          alignment: "right",
          formItem: true,
        },
        {
          dataField: "name",
          caption: "msgMetaName",
          required: true,
          width: "100%",
        },
        {
          dataField: "short_name_rus",
          caption: "msgShortNameRus",
          visible: false,
          width: "100%",
        },
        {
          dataField: "short_name_uzcyr",
          caption: "msgShortNameUzcyr",
          visible: false,
          width: "100%",
        },
        {
          dataField: "short_name_uzlat",
          caption: "msgShortNameUzlat",
          visible: false,
          width: "100%",
        },
        {
          dataField: "short_name_karlat",
          caption: "msgShortNameKarlat",
          visible: false,
          width: "100%",
        },
        {
          dataField: "short_name_eng",
          caption: "msgShortNameEng",
          visible: false,
          width: "100%",
        },
        {
          dataField: "class",
          caption: "msgClass",
          width: 100,
          alignment: "center",
        },
        {
          dataField: "metaid",
          caption: "msgAsChildOf",
          lookup: true,
          width: "100%",
        },
      ];

      murkupCollection = [...pageTitleCollection];
    }

    // if (pathnameWithoutSlash === "userObjects") {
    //   const pageTitleCollection = [
    //     {
    //       dataField: "UserName",
    //       caption: "msgUserName",
    //       required: true,
    //       width: 200,
    //     },
    //     {
    //       dataField: "Locale",
    //       caption: "msgLocale",
    //       width: 100,
    //       alignment: "center",
    //     },
    //     {
    //       dataField: "Locked",
    //       caption: "msgLocked",
    //       width: 120,
    //       alignment: "center",
    //     },
    //     {
    //       dataField: "Disabled",
    //       caption: "msgDisabled",
    //       width: 100,
    //       alignment: "center",
    //     },
    //     {dataField: "TimeZone", caption: "msgTimeZone", width: "100%"},
    //     {dataField: "created", caption: "msgCreated", width: 200},
    //     {dataField: "pwdlastchange", caption: "msgPwdLastChange", width: 200},
    //     {
    //       dataField: "UserType",
    //       caption: "msgUserType",
    //       width: 120,
    //       alignment: "center",
    //     },
    //   ];

    //   murkupCollection = [...pageTitleCollection];
    // }

    // if (
    //   // pathnameWithoutSlash === "roleObjects" ||
    //   pathnameWithoutSlash === "groupObjects"
    // ) {
    //   const pageTitleCollection = [
    //     {
    //       dataField: "UserName",
    //       caption: "msgUserName",
    //       required: true,
    //       width: "100%",
    //     },
    //     {
    //       dataField: "Disabled",
    //       caption: "msgDisabled",
    //       width: 100,
    //       alignment: "center",
    //     },
    //     {dataField: "created", caption: "msgCreated", width: "100%"},
    //     {
    //       dataField: "UserType",
    //       caption: "msgUserType",
    //       width: 120,
    //       alignment: "center",
    //     },
    //   ];

    //   murkupCollection = [...pageTitleCollection];
    // }

    return murkupCollection.map((item, idx) => {
      const {
        dataField,
        dataType = "string",
        caption = dataField,
        visible = true,
        disabled = false,
        required = false,
        width = "100%",
        minWidth = 80,
        alignment,
        formItem = false,
        lookup = false,
        allowEditing = true,
        ...params
      } = item;

      return (
        <Column
          key={idx}
          dataField={dataField}
          dataType={dataType}
          // caption={caption}
          caption={
            checkIfArrIncludesValue(["ShortDics"], pathnameWithoutSlash)
              ? formatMessage(caption)
              : caption
          }
          visible={visible}
          disabled={disabled}
          // width={width}
          width={dataField !== "id" ? width : 80}
          alignment={alignment}
          minWidth={minWidth}
          allowEditing={allowEditing}
          {...params}
        >
          {required && <RequiredRule />}

          <FormItem {...formItem} />

          {lookup && pathnameWithoutSlash === "ShortDics" && (
            <Lookup
              dataSource={lookDataState}
              valueExpr="id"
              displayExpr="className"
            />
          )}

          {lookup && pathnameWithoutSlash !== "ShortDics" && (
            <Lookup
              dataSource={lookDataState}
              valueExpr="id"
              displayExpr="name"
            />
          )}

          {dataField === "status" && <Lookup dataSource={statusesLang()} />}

          {/* {dataField === "code" && (
            <PatternRule
              message={formatMessage(message, localPageAbbreviation)}
              pattern={new RegExp(pattern)}
            />
          )} */}
        </Column>
      );
    });
  }

  function onFocusedCellAction(e) {
    // console.log(`e`, e);

    if (
      checkIfArrIncludesValue(
        ["userObjects", "roleObjects", "groupObjects"],
        pathnameWithoutSlash
      )
    ) {
      const rowId = e.rows[e.newRowIndex].data.GID;
      const formDataFromFocusedRow = e.rows[e.newRowIndex].data;
      setUserDataGID(rowId);
      setUserFormData(formDataFromFocusedRow);
    }
  }

  function customSimpleItemMarkup(formData) {
    if (!formData) {
      return;
    }

    // console.log(`formData =>>`, formData);

    return Object.keys(formData).map((item, idx) => (
      <SimpleItem key={idx} dataField={item} />
    ));
  }

  userDataGID &&
    userRolesFormData &&
    console.log(`userRolesFormData`, userRolesFormData);

  // function customCodeMarkupRender() {
  //   let murkupCollection = [];

  //   if (pathnameWithoutSlash === "soogu") {
  //     const pageTitleCollection = [
  //       {
  //         dataField: "CodeSogu",
  //         caption: "msgCodeSoogu",
  //         width: 120,
  //         message: "msgCodeSooguNumericErrMsg",
  //         pattern: "^[0-9]{4,5}$",
  //         required: true,
  //       },
  //       {
  //         dataField: "CodeOKPO",
  //         caption: "msgCodeOKPO",
  //         width: 120,
  //         message: "msgCodeOKPONumericErrMsg",
  //         pattern: "^[0-9]{0,8}$",
  //         required: true,
  //       },
  //     ];

  //     murkupCollection = [...pageTitleCollection];
  //   }

  //   // if (pathnameWithoutSlash === "countries") {
  //   //   const pageTitleCollection = [
  //   //     {
  //   //       dataField: "alpha2code",
  //   //       caption: "msgAlpha2Code",
  //   //       width: 80,
  //   //       message: "msgAlpha2CodeErrMsg",
  //   //       pattern: "^[A-Z]{2}$",
  //   //       required: true,
  //   //     },
  //   //     {
  //   //       dataField: "alpha3code",
  //   //       caption: "msgAlpha3Code",
  //   //       width: 80,
  //   //       message: "msgAlpha3CodeErrMsg",
  //   //       pattern: "^[A-Z]{3}$",
  //   //       required: true,
  //   //     },
  //   //     {
  //   //       dataField: "numeric",
  //   //       caption: "msgNumeric",
  //   //       width: 100,
  //   //       message: "msgNumericErrMessage",
  //   //       pattern: "^[0-9]{0,4}$",
  //   //       required: false,
  //   //     },
  //   //   ];

  //   //   murkupCollection = [...pageTitleCollection];
  //   // }

  //   return murkupCollection.map((item, idx) => {
  //     const {dataField, caption, width, message, pattern, required, ...params} =
  //       item;

  //     return (
  //       <Column
  //         key={idx}
  //         dataField={dataField}
  //         caption={formatMessage(caption)}
  //         alignment="center"
  //         width={width}
  //         visible={true}
  //         {...params}
  //       >
  //         <PatternRule
  //           message={formatMessage(message)}
  //           pattern={new RegExp(pattern)}
  //         />
  //         {required && <RequiredRule />}
  //       </Column>
  //     );
  //   });
  // }

  // function onToolbarPreparing(e) {
  //   console.log(e);
  // e.toolbarOptions.items[0].showText = "always";
  // e.toolbarOptions.items[0].options.text = "Button text";
  // e.toolbarOptions.items[0].options.hint = "Text";

  // e.toolbarOptions.items.push({
  //   location: "after",
  //   template: "deleteButton",
  // });
  // }

  return (
    <>
      <h2 className={"content-block"}>
        {formatMessage(`${localPathname}HeaderTitle`, localPageAbbreviation)}
      </h2>
      <DataGrid
        dataSource={APIData}
        // keyExpr="id"
        repaintChangesOnly={true}
        remoteOperations={false}
        // rows
        focusedRowEnabled={true}
        // columns
        showColumnLines={true}
        columnMinWidth={60}
        columnAutoWidth={true}
        columnHidingEnabled={false}
        allowColumnResizing={true}
        allowColumnReordering={true}
        // appearance
        hoverStateEnabled={true}
        wordWrapEnabled={true}
        // functions
        onInitNewRow={initNewRow}
        // onToolbarPreparing={onToolbarPreparing}
        onFocusedCellChanging={onFocusedCellAction}
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} width={250} />
        {/* <HeaderFilter visible={true} allowSearch={true} /> */}
        <ColumnChooser
          enabled={true}
          allowSearch={true}
          width={300}
          height={320}
          title={formatMessage("msgColomnChooser")}
          emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
        />
        <FilterRow visible={true} />

        {checkIfArrIncludesValue(
          ["userObjects", "roleObjects", "groupObjects"],
          pathnameWithoutSlash
        ) ? (
          <Editing
            mode="popup"
            popup={popupUsersPageOptions}
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}
          >
            <Form
              id="form"
              formData={
                userDataGID && userRolesFormData && userRolesFormData[0]
              }
              // showColonAfterLabel={true}
              // labelLocation={"top"}
              // minColWidth={900}
              colCount={1}
              width={"100%"}
              // colSpan={3}
            >
              <GroupItem
                caption={`Information about ${
                  userFormData && userFormData.UserName
                }`}
              >
                <TabbedItem>
                  <TabPanelOptions deferRendering={false} />

                  <Tab title="General" colCount={2}>
                    {customSimpleItemMarkup(userFormData)}
                  </Tab>

                  <Tab title="Group/Role" colCount={2}>
                    {userDataGID &&
                      userRolesFormData &&
                      userRolesFormData.map((user, idx) => (
                        <GroupItem
                          key={idx}
                          colCount={2}
                          colSpan={2}
                          caption={`Information about ${user.UserName}`}
                        >
                          {customSimpleItemMarkup(user)}
                          <EmptyItem />
                          <EmptyItem />
                        </GroupItem>
                      ))}
                  </Tab>
                </TabbedItem>
              </GroupItem>
            </Form>
          </Editing>
        ) : (
          <Editing
            mode="popup"
            popup={popupGeneralOptions}
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}
          />
        )}

        {customMarkupRender()}

        {/* {customCodeMarkupRender()} */}

        {pathnameWithoutSlash === "ShortDics" && (
          <MasterDetail enabled={true} component={DetailTemplate} />
        )}

        <Column type="buttons" width={110}>
          <Button
            name="edit"
            hint={formatMessage("msgEditNewItem", localPageAbbreviation)}
          />
          <Button
            name="delete"
            hint={formatMessage("msgDeleteNewItem", localPageAbbreviation)}
          />
        </Column>

        <Paging defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          showNavigationButtons={true}
          showInfo={true}
          visible={true}
          allowedPageSizes={[10, 20, 50, 100, "all"]}
          showAllItem={true}
        />
      </DataGrid>
    </>
  );
};
