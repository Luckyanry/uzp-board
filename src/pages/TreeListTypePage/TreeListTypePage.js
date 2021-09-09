import React, {useEffect, useState} from "react";

import TreeList, {
  SearchPanel,
  HeaderFilter,
  FilterRow,
  Scrolling,
  ColumnChooser,
  Editing,
  Column,
  RequiredRule,
  // PatternRule,
  FormItem,
  Lookup,
  Button as TreeListButton,
  Paging,
  Pager,
} from "devextreme-react/tree-list";
import Button from "devextreme-react/button";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./TreeListTypePage.scss";

export const TreeListTypePage = ({location: {pathname}}) => {
  const [toggler, setToggler] = useState(false);
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState([]);
  const [lookDataState, setLookDataState] = useState([]);
  const [expandRowsBtnText, setExpandRowsBtnText] =
    useState("msgExpandAllRows");
  // const [expandedRowKeys, setExpandedRowKeys] = useState([1, 3, 5]);

  const {formatMessage} = useLocalization();

  const pathnameWithoutSlash = pathname.split("/")[1];
  const localPathname = createCustomMsg(pathnameWithoutSlash);
  const localPageAbbreviation = formatMessage(
    customPageAbbreviationMsg(pathnameWithoutSlash)
  );

  const popupOpt = {
    title: formatMessage("msgCreateNewItem", localPageAbbreviation),
    showTitle: true,
    width: 950,
    height: 780,
  };

  useEffect(() => {
    async function getColumnsSchemaData() {
      const fetchColumnsSchemaData = fetchDataConstructor("hbdb").fetchData;

      const result = await fetchColumnsSchemaData
        ._loadFunc()
        .then((res) => res.data);

      setColumnsSchemaData(result);
      getAPIData();

      const lookupSpForURL = getSpForURLFromLookup(result);

      if (lookupSpForURL) {
        lookupSpForURL.map((item) => getLookDataState(item));
      }
    }

    function getAPIData() {
      const fetchData = fetchDataConstructor("hbdb").fetchColumnsSchemaData;

      setAPIData(fetchData);
    }

    async function getLookDataState(lookupSpForURL) {
      const lookData = FetchData(
        formatMessage,
        pathname,
        lookupSpForURL
      ).lookData;

      const result = await lookData._loadFunc().then((res) => res.data);

      setLookDataState(result);
    }

    getColumnsSchemaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchDataConstructor(dataBase) {
    return FetchData(formatMessage, pathname, pathnameWithoutSlash, dataBase);
  }

  function statusesLang() {
    const defaultStatus = ["msgStatusActive", "msgStatusDeactivated"];
    const statusLanguage = defaultStatus.map((statusLang) =>
      formatMessage(statusLang)
    );
    return statusLanguage;
  }

  function initNewRow(e) {
    e.data.status = statusesLang()[0];
  }

  function clickHandler() {
    setToggler((toggler) => !toggler);
    setExpandRowsBtnText(() =>
      expandRowsBtnText === "msgMinimisedAllRows"
        ? "msgExpandAllRows"
        : "msgMinimisedAllRows"
    );

    if (toggler) {
      window.location.reload();
    }
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
    const findLookup = data.filter(({lookup}) => lookup);

    if (findLookup) {
      return findLookup.map(({lookup}) => lookup.isfetch.split(".")[2]);
    } else {
      return;
    }
  }

  function customMarkupRender() {
    return columnsSchemaData.map((item, idx) => {
      const {
        dataField,
        dataType = "string",
        caption = dataField,
        visible = false,
        disabled = false,
        required = false,
        width = "100%",
        minWidth = 250,
        alignment = "left",
        formItem = false,
        lookup = false,
        allowEditing = false,
        ...params
      } = item;
      console.log(`lookup`, {...lookup});
      return (
        <Column
          key={idx}
          dataField={dataField}
          dataType={dataType}
          caption={caption}
          visible={visible}
          disabled={disabled}
          width={width}
          alignment={alignment}
          minWidth={minWidth}
          allowEditing={allowEditing}
          {...params}
        >
          {required && <RequiredRule />}
          <FormItem {...formItem} />
          {lookup && (
            <Lookup
              dataSource={lookDataState}
              valueExpr={lookup.valueExpr}
              displayExpr={lookup.displayExpr}
              // {...lookup}
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

  return (
    <div className="page-wrapper">
      <h2 className={"content-block"}>
        {formatMessage(`${localPathname}HeaderTitle`, localPageAbbreviation)}
      </h2>

      <Button
        className="btn"
        icon="hierarchy"
        stylingMode="outlined"
        text={formatMessage(expandRowsBtnText)}
        onClick={clickHandler}
      />

      <TreeList
        dataSource={APIData}
        rootValue={0}
        keyExpr="id"
        parentIdExpr="pid"
        // defaultExpandedRowKeys={[1, 3, 5]}
        // rows
        showRowLines={true}
        focusedRowEnabled={true}
        rowAlternationEnabled={false}
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
        virtualModeEnabled={true}
        // functions
        autoExpandAll={toggler}
        onInitNewRow={initNewRow}
        // onEditorPreparing={onEditorPreparing}
        // onFocusedCellChanging={onFocusedCellChanging}
        // onToolbarPreparing={onToolbarPreparing}
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} allowSearch={true} />
        <ColumnChooser
          enabled={true}
          allowSearch={true}
          width={300}
          height={365}
          title={formatMessage("msgColomnChooser")}
          emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
        />
        <FilterRow visible={true} />

        <Editing
          mode="popup"
          popup={popupOpt}
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
        />

        {customMarkupRender()}

        <Column type="buttons" width={110}>
          <TreeListButton
            name="add"
            hint={formatMessage("msgAddNewItem", localPageAbbreviation)}
          />
          <TreeListButton
            name="edit"
            hint={formatMessage("msgEditNewItem", localPageAbbreviation)}
          />
          <TreeListButton
            name="delete"
            hint={formatMessage("msgDeleteNewItem", localPageAbbreviation)}
          />
        </Column>

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
    </div>
  );
};

// ===========
// function checkIfArrIncludesValue(arr, value) {
//   return arr.includes(value);
// }

// ===========
// function customMarkupRender() {
// checkIfArrIncludesValue(
//   ["oked", "kopf", "kfs", "kspd"],
//   pathnameWithoutSlash
// ) && (columnsTitleCollection = columnsSchemaData);
// if (pathnameWithoutSlash === "kspd") {
//   const pageTitleCollection = [
//     {
//       dataField: "id",
//       caption: "msgId",
//       visible: false,
//       disabled: true,
//       required: false,
//       allowEditing: false,
//       formItem: true,
//       width: 80,
//       alignment: "center",
//     },
//     {dataField: "name_rus", caption: "msgNameRus", visible: true},
//     {dataField: "name_uzcyr", caption: "msgNameUzcyr"},
//     {dataField: "name_uzlat", caption: "msgNameUzlat"},
//     {dataField: "name_karlat", caption: "msgNameKarlat"},
//     {dataField: "name_eng", caption: "msgNameEng"},
//     {
//       dataField: "pid",
//       caption: "msgAsChildOf",
//       visible: false,
//       lookup: true,
//     },
//   ];

//   columnsTitleCollection = [...pageTitleCollection];
//   // console.log(`columnsTitleCollection kopf => `, columnsTitleCollection);
// }

// if (pathnameWithoutSlash === "soato") {
//   const pageTitleCollection = [
//     {
//       dataField: "id",
//       caption: "msgId",
//       visible: false,
//       disabled: true,
//       required: false,
//       allowEditing: false,
//       formItem: true,
//       width: 80,
//       alignment: "center",
//     },
//     {
//       dataField: "territory_name_rus",
//       caption: "msgTerritoryNameRus",
//       visible: true,
//     },
//     {dataField: "territory_name_uzcyr", caption: "msgTerritoryNameUzcyr"},
//     {dataField: "territory_name_uzlat", caption: "msgTerritoryNameUzlat"},
//     {dataField: "territory_name_karlat", caption: "msgTerritoryNameKarlat"},
//     {dataField: "territory_name_eng", caption: "msgTerritoryNameEng"},
//     {dataField: "admin_centre_rus", caption: "msgAdminCentreRus"},
//     {dataField: "admin_centre_uzcyr", caption: "msgAdminCentreUzcyr"},
//     {dataField: "admin_centre_uzlat", caption: "msgAdminCentreUzlat"},
//     {dataField: "admin_centre_karlat", caption: "msgAdminCentreKarlat"},
//     {dataField: "admin_centre_eng", caption: "msgAdminCentreEng"},
//     {
//       dataField: "pid",
//       caption: "msgAsChildOf",
//       visible: false,
//       lookup: true,
//     },
//   ];

//   columnsTitleCollection = [...pageTitleCollection];
// }

// ============
// function customCodeMarkupRender() {
//   let murkupCollection = [];

// if (pathnameWithoutSlash === "kopf") {
//   const pageTitleCollection = [
//     {
//       dataField: "code",
//       width: 120,
//       message: "msgCodeErrThreeDigitsMsg",
//       pattern: "^[0-9]{3}$",
//     },
//   ];

//   murkupCollection = [...pageTitleCollection];
// }

// if (pathnameWithoutSlash === "soato") {
//   const pageTitleCollection = [
//     {
//       dataField: "code",
//       width: 120,
//       message: "msgCodeErrNumericMsg",
//       pattern: "^[0-9]*$",
//     },
//   ];

//   murkupCollection = [...pageTitleCollection];
// }

// if (pathnameWithoutSlash === "kspd") {
//   const pageTitleCollection = [
//     {
//       dataField: "code",
//       width: 120,
//       message: "msgCodeErrTwoDigitsMsg",
//       pattern: "^[0-9]{1,2}$",
//     },
//   ];

//   murkupCollection = [...pageTitleCollection];
// }

// if (pathnameWithoutSlash === "kfs") {
//   const pageTitleCollection = [
//     {
//       dataField: "KFSCode",
//       width: 100,
//       message: "msgCodeErrThreeDigitsMsg",
//       pattern: "^[0-9]{3}$",
//     },
//   ];

//   murkupCollection = [...pageTitleCollection];
// }
// else if (pathnameWithoutSlash === "oked") {
//   const pageTitleCollection = [
//     {
//       dataField: "code",
//       width: 120,
//       message: "msgCodeErrFiveDigitsMsg",
//       pattern: "^[0-9]{0,5}$",
//       required: false,
//     },
//   ];

//   murkupCollection = [...pageTitleCollection];
// }

//   return murkupCollection.map((item, idx) => {
//     const {
//       dataField,
//       width,
//       message,
//       pattern,
//       required = true,
//       alignment = "left",
//       ...params
//     } = item;

//     return (
//       <Column
//         key={idx}
//         dataField={dataField}
//         caption={formatMessage(`${localPathname}Code`, localPageAbbreviation)}
//         alignment={alignment}
//         width={width}
//         visible={true}
//         {...params}
//       >
//         <PatternRule
//           message={formatMessage(message, localPageAbbreviation)}
//           pattern={new RegExp(pattern)}
//         />
//         {required && <RequiredRule />}
//       </Column>
//     );
//   });
// }

// console.log(`customCodeMarkupRender`, customCodeMarkupRender());

// function onEditorPreparing(e) {
//   console.log(`onEditorPreparing(e) =>`, e);
//   // if (e.parentType === "dataRow" && e.dataField === "CityID") {
//   //   e.editorOptions.disabled = typeof e.row.data.StateID !== "number";
//   // }
// }

// const onFocusedCellChanging = (e) => {
//   console.log(`onFocusedCellChanging(e.newRowIndex) => `, e.newRowIndex);
//   console.log(`onFocusedCellChanging(e) => `, e);
//   // e.isHighlighted = true;
// };

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

// =========
// <Column
// key={idx}
// dataField={dataField}
// dataType={dataType}
// caption={
//   checkIfArrIncludesValue(
//     ["oked", "kopf", "kfs", "kspd"],
//     pathnameWithoutSlash
//   )
//     ? caption
//     : formatMessage(caption)
// }
// // caption={caption}
// visible={visible}
// disabled={disabled}
// width={width}
// alignment={alignment}
// minWidth={minWidth}
// allowEditing={allowEditing}
// {...params}
// >
