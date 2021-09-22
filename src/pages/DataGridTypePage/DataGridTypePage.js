import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  SearchPanel,
  HeaderFilter,
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
  LoadPanel,
  StateStoring,
} from "devextreme-react/data-grid";
import {
  SimpleItem,
  GroupItem,
  TabbedItem,
  TabPanelOptions,
  Tab,
} from "devextreme-react/form";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";
import {
  checkIfArrIncludesValue,
  createCustomMsg,
  customPageAbbreviationMsg,
  getLookupParamsForURL,
} from "../../helpers/functions";

import {StatusLangToggler} from "../../components";
import {DetailTemplate} from "../../components";
import {UserDetailTab} from "../../components";

import "./DataGridTypePage.scss";

export const DataGridTypePage = ({location: {pathname}}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);
  const [lookDataState, setLookDataState] = useState([]);

  const [userID, setUserID] = useState("");
  const [userFormData, setUserFormData] = useState(null);
  const [userGroupItemCaption, setUserGroupItemCaption] = useState("");

  const {formatMessage} = useLocalization();

  const pathnameWithoutSlash = pathname.split("/")[1];
  const localPathname = createCustomMsg(pathnameWithoutSlash);
  const localPageAbbreviation = formatMessage(
    customPageAbbreviationMsg(pathnameWithoutSlash)
  );

  const statusToggler = StatusLangToggler().statusToggler();

  const popupGeneralOptions = {
    title: formatMessage("msgCreateNewItem", localPageAbbreviation),
    showTitle: true,
    width: 1000,
    height: 700,
  };

  const popupUsersPageOptions = {
    title: formatMessage("msgCreateNewItem", localPageAbbreviation),
    showTitle: false,
    width: 900,
    height: 680,
  };

  useEffect(() => {
    async function getColumnsSchemaData() {
      const fetchColumnsSchemaData = fetchDataConstructor("hbdb").fetchData;

      const result = await fetchColumnsSchemaData
        ._loadFunc()
        .then((res) => res.data);

      setColumnsSchemaData(result);
      getAPIData();

      const lookupParamsForURL = getLookupParamsForURL(result);

      if (lookupParamsForURL.length) {
        lookupParamsForURL.map(({sp, db, dataField}) =>
          getLookDataState(sp, db, dataField)
        );
      }
    }

    function getAPIData() {
      if (
        checkIfArrIncludesValue(
          ["userObjects", "roleObjects", "groupObjects", "objectMembers"],
          pathnameWithoutSlash
        )
      ) {
        const usersFetchData = fetchDataConstructor("wisdb").usersFetchData;
        return setAPIData(usersFetchData);
      }

      if (
        checkIfArrIncludesValue(
          ["personObjects", "orgUnits", "employees", "legals"],
          pathnameWithoutSlash
        )
      ) {
        const fetchData = fetchDataConstructor("odb").personFetchData;
        return setAPIData(fetchData);
      }

      if (checkIfArrIncludesValue(["recordLog"], pathnameWithoutSlash)) {
        const fetchData = fetchDataConstructor("wisdb").usersFetchData;
        return setAPIData(fetchData);
      }

      const fetchData = fetchDataConstructor("hbdb").fetchColumnsSchemaData;
      setAPIData(fetchData);
    }

    async function getLookDataState(
      lookupSpForURL,
      lookupDBForURL,
      dataField = null
    ) {
      const lookData = FetchData(
        pathname,
        lookupSpForURL,
        lookupDBForURL
      ).lookData;

      await lookData.store
        ._loadFunc()
        .then((res) => (lookData.store.__rawData = [...res.data]));

      setLookDataState((prev) =>
        dataField ? [...prev, {[dataField]: lookData}] : lookData
      );
    }

    pathnameWithoutSlash !== "ShortDics" && getColumnsSchemaData();

    if (pathnameWithoutSlash === "ShortDics") {
      getAPIData();
      getLookDataState(pathnameWithoutSlash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchDataConstructor(dataBase) {
    return FetchData(pathname, pathnameWithoutSlash, dataBase);
  }

  function initNewRow(e) {
    e.data.status = statusToggler[0];
    setUserID("");
  }

  function customMarkupRender() {
    let murkupCollection = [];

    checkIfArrIncludesValue(
      [
        "countries",
        "mahalla",
        "soogu",
        "userObjects",
        "roleObjects",
        "groupObjects",
        "objectMembers",
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
          showEditorAlways={false}
          trueText={
            dataField === "status"
              ? formatMessage("msgStatusActive")
              : formatMessage("msgYes")
          }
          falseText={
            dataField === "status"
              ? formatMessage("msgStatusDeactivated")
              : formatMessage("msgNo")
          }
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

          {lookup &&
            pathnameWithoutSlash !== "ShortDics" &&
            lookDataState.map((item, i) => {
              // eslint-disable-next-line
              if (!item[dataField]) return;

              // dataSource={{...item[dataField], ...lookup.dataSource}}
              return (
                <Lookup
                  key={i + dataField}
                  {...lookup}
                  dataSource={item[dataField]}
                />
              );
            })}

          {dataField === "status" && <Lookup dataSource={statusToggler} />}

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

  function onFocusedCellChanging(e) {
    if (
      checkIfArrIncludesValue(
        ["userObjects", "roleObjects", "groupObjects", "objectMembers"],
        pathnameWithoutSlash
      )
    ) {
      // console.log(`onFocusedCellAction e `, e);

      const userFormData = e.rows[e.newRowIndex].data;
      const rowId = userFormData.GID;
      const groupItemCaption = userFormData.UserName;
      // console.log(`onFocusedCellChanging userFormData`, userFormData);

      setUserID(rowId);
      setUserFormData(userFormData);
      setUserGroupItemCaption(groupItemCaption);
    }
  }

  function customSimpleItemMarkup(formData) {
    if (!formData) {
      return;
    }

    return Object.keys(formData).map((item, idx) => {
      return <SimpleItem key={idx} dataField={item} />;
    });
  }

  // function handleOptionChange(e) {
  //   e.fullName === "focusedRowKey" && setUserID(e.value);
  // }

  function editorCustomMarkup() {
    return userID ? (
      <Editing
        mode="popup"
        popup={popupUsersPageOptions}
        allowAdding={true}
        allowDeleting={true}
        allowUpdating={true}
      >
        <Form id="form" formData={userFormData} colCount={1} width={"100%"}>
          <GroupItem caption={userGroupItemCaption}>
            <TabbedItem>
              <TabPanelOptions deferRendering={false} />
              <Tab title={formatMessage("msgInfoAboutUser")} colCount={2}>
                {customSimpleItemMarkup(userFormData)}
              </Tab>

              {checkIfArrIncludesValue(
                ["roleObjects", "userObjects"],
                pathnameWithoutSlash
              ) && (
                <Tab title={formatMessage("msgGroups")} colCount={2}>
                  <UserDetailTab
                    user={userFormData}
                    UserGroups={"UserGroups"}
                  />
                </Tab>
              )}

              {checkIfArrIncludesValue(
                ["groupObjects", "userObjects"],
                pathnameWithoutSlash
              ) && (
                <Tab title={formatMessage("msgRoles")} colCount={2}>
                  <UserDetailTab user={userFormData} UserGroups={"UserRoles"} />
                </Tab>
              )}

              {checkIfArrIncludesValue(
                ["roleObjects", "groupObjects"],
                pathnameWithoutSlash
              ) && (
                <Tab title={formatMessage("msgMembers")} colCount={2}>
                  <UserDetailTab
                    user={userFormData}
                    UserGroups={"ISGroupObjectMembers"}
                  />
                </Tab>
              )}
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
    );
  }

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
        // focusedRowIndex={0}
        // columns
        showColumnLines={true}
        columnMinWidth={80}
        columnAutoWidth={true}
        columnHidingEnabled={false}
        allowColumnResizing={true}
        allowColumnReordering={true}
        // appearance
        hoverStateEnabled={true}
        wordWrapEnabled={true}
        // functions
        onInitNewRow={initNewRow}
        onFocusedCellChanging={onFocusedCellChanging}

        // onContentReady={selectFirstRow}
        // onOptionChanged={handleOptionChange}
      >
        <Scrolling mode="standard" useNative="true" />
        <SearchPanel visible={true} width={250} />
        <HeaderFilter visible={true} allowSearch={true} />
        <ColumnChooser
          enabled={true}
          allowSearch={true}
          width={300}
          height={320}
          title={formatMessage("msgColomnChooser")}
          emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
        />
        <StateStoring
          enabled={false}
          type="localStorage"
          storageKey="storage"
        />

        <FilterRow visible={true} />

        {checkIfArrIncludesValue(
          ["userObjects", "roleObjects", "groupObjects", "objectMembers"],
          pathnameWithoutSlash
        ) ? (
          editorCustomMarkup()
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
        <LoadPanel enabled="true" />
      </DataGrid>
    </>
  );
};

// ===============

//<GroupItem caption={`Information about ${userID && userGroupItemCaption}`}>
//  <TabbedItem>
//    <TabPanelOptions deferRendering={false} />
//    <Tab title="General" colCount={2}>
//      {customSimpleItemMarkup(userFormData)}
//    </Tab>

//    <Tab title="Group/Role" colCount={2}>
//      {userID && <UserDetailTab user={userFormData} />}
//    </Tab>
//  </TabbedItem>
//</GroupItem>;

// ===============

// import {Item} from "devextreme-react/form";
// import {
//   SimpleItem,
//   GroupItem,
//   TabbedItem,
//   TabPanelOptions,
//   Tab,
//   EmptyItem,
// } from "devextreme-react/form";

// import {Tabs} from "devextreme-react/tabs";

// ===============

// const popupUsersPageOptions = {
//   title: formatMessage("msgCreateNewItem", localPageAbbreviation),
//   showTitle: false,
//   width: 1000,
//   height: 700,
// };

// ===============

// useEffect(() => {
//   async function getUserRolesFormData() {
//     const usersFetchData = FetchData(
//       formatMessage,
//       pathname,
//       `w_DisplayUserRoles&@GID=${userDataGID}`,
//       "wisdb"
//     ).usersFetchData;

//     const result = await usersFetchData._loadFunc().then((res) => res.data);

//     setUserRolesFormData(result);
//   }

//   checkIfArrIncludesValue(
//     ["userObjects", "roleObjects", "groupObjects"],
//     pathnameWithoutSlash
//   ) &&
//     userDataGID &&
//     getUserRolesFormData();

//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [userDataGID]);

// ===============

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

// ===============

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

// ===============

// function onFocusedCellAction(e) {
//   // console.log(`e`, e);

//   if (
//     checkIfArrIncludesValue(
//       ["userObjects", "roleObjects", "groupObjects"],
//       pathnameWithoutSlash
//     )
//   ) {
//     const rowId = e.rows[e.newRowIndex].data.GID;
//     const formDataFromFocusedRow = e.rows[e.newRowIndex].data;
//     setUserDataGID(rowId);
//     setUserFormData(formDataFromFocusedRow);
//   }
// }

// function customSimpleItemMarkup(formData) {
//   if (!formData) {
//     return;
//   }

//   return Object.keys(formData).map((item, idx) => (
//     <SimpleItem key={idx} dataField={item} />
//   ));
// }

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

// ==================

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

// ==================

// {
//   checkIfArrIncludesValue(
//     ["userObjects", "roleObjects", "groupObjects"],
//     pathnameWithoutSlash
//   ) ? (
//     <Editing
//       mode="popup"
//       popup={popupUsersPageOptions}
//       allowAdding={true}
//       allowDeleting={true}
//       allowUpdating={true}
//     >
//       <Form
//         id="form"
//         formData={userDataGID && userRolesFormData && userRolesFormData[0]}
//         colCount={1}
//         width={"100%"}
//       >
//         <GroupItem
//           caption={`Information about ${userFormData && userFormData.UserName}`}
//         >
//           <TabbedItem>
//             <TabPanelOptions deferRendering={false} />

//             <Tab title="General" colCount={2}>
//               {customSimpleItemMarkup(userFormData)}
//             </Tab>

//             <Tab title="Group/Role" colCount={2}>
//               {userDataGID &&
//                 userRolesFormData &&
//                 userRolesFormData.map((user, idx) => (
//                   <GroupItem
//                     key={idx}
//                     colCount={2}
//                     colSpan={2}
//                     caption={`Information about ${user.UserName}`}
//                   >
//                     {customSimpleItemMarkup(user)}
//                     <EmptyItem />
//                     <EmptyItem />
//                   </GroupItem>
//                 ))}
//             </Tab>
//           </TabbedItem>
//         </GroupItem>
//       </Form>
//     </Editing>
//   ) : (
//     <Editing
//       mode="popup"
//       popup={popupGeneralOptions}
//       allowAdding={true}
//       allowDeleting={true}
//       allowUpdating={true}
//     />
//   );
// }
