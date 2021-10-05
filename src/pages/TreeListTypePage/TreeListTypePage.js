import React, {useEffect, useState} from "react";

import TreeList, {
  SearchPanel,
  FilterRow,
  Scrolling,
  ColumnChooser,
  Editing,
  Column,
  RequiredRule,
  FormItem,
  Lookup,
  Button as TreeListButton,
  Paging,
  Pager,
  LoadPanel,
  StateStoring,
  Form,
} from "devextreme-react/tree-list";
import {
  SimpleItem,
  Tab,
  TabbedItem,
  TabPanelOptions,
  GroupItem,
} from "devextreme-react/form";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";
import {StatusLangToggler} from "../../components/StatusLangToggler/StatusLangToggler";
import DatailTreeListTab from "../../components/DetailTreeListTab/DetailTreeListTab";
import {ErrorPopup} from "../../components";
import {
  checkIfArrIncludesValue,
  createCustomMsg,
  customPageAbbreviationMsg,
  getLookupParamsForURL,
} from "../../helpers/functions";

import spinner from "../../components/Spinner/icons/spinner.svg";
import "./TreeListTypePage.scss";

export const TreeListTypePage = ({location: {pathname}}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState([]);
  const [lookDataState, setLookDataState] = useState([]);

  const [toggler, setToggler] = useState(false);
  const [expandRowsBtnText, setExpandRowsBtnText] =
    useState("msgExpandAllRows");
  // const [expandedRowKeys, setExpandedRowKeys] = useState([1, 3, 5]);

  const [masterId, setMasterId] = useState("");
  const [formData, setFormData] = useState(null);
  const [groupItemCaption, setGroupItemCaption] = useState("");

  const [errorStatus, setErrorStatus] = useState(null);

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
    width: 1200,
    height: 800,
  };

  const popupDetailTreeListTabOptions = {
    title: formatMessage("msgCreateNewItem", localPageAbbreviation),
    showTitle: false,
    width: 1200,
    height: 800,
  };

  const popupOpt = {
    title: formatMessage("msgCreateNewItem", localPageAbbreviation),
    showTitle: true,
    width: 950,
    height: 780,
  };

  useEffect(() => {
    (async () => {
      const fetchColumnsSchemaData = FetchData(
        pathname,
        pathnameWithoutSlash,
        "hbdb"
      ).fetchData;

      const result = await fetchColumnsSchemaData
        ._loadFunc()
        .then((res) => res.data)
        .catch((err) => setErrorStatus(err));

      setColumnsSchemaData(result);
      getAPIData();

      const lookupParamsForURL = getLookupParamsForURL(result);

      if (lookupParamsForURL.length) {
        lookupParamsForURL.map(({sp, db, dataField}) =>
          getLookDataState(sp, db, dataField)
        );
      }
    })();

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
        .then((res) => (lookData.store.__rawData = [...res.data]))
        .catch((err) => setErrorStatus(err));

      setLookDataState((prev) =>
        dataField ? [...prev, {[dataField]: lookData}] : lookData
      );
    }

    function getAPIData() {
      if (
        checkIfArrIncludesValue(["auditSettingsMaster"], pathnameWithoutSlash)
      ) {
        const fetchData = FetchData(
          pathname,
          pathnameWithoutSlash,
          "logdb"
        ).fetchColumnsSchemaData;

        return setAPIData(fetchData);
      }

      const fetchData = FetchData(
        pathname,
        pathnameWithoutSlash,
        "hbdb"
      ).fetchColumnsSchemaData;

      setAPIData(fetchData);
    }
  }, [pathname, pathnameWithoutSlash]);

  function initNewRow(e) {
    e.data.status = statusToggler[0];
  }

  function clickHandler(e) {
    setExpandRowsBtnText(() =>
      expandRowsBtnText === "msgMinimisedAllRows"
        ? "msgExpandAllRows"
        : "msgMinimisedAllRows"
    );

    setToggler((toggler) => !toggler);

    if (toggler) {
      window.location.reload();
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

          {lookup &&
            lookDataState.map((item, i) => {
              // eslint-disable-next-line
              if (!item[dataField]) return;

              //const dataSourceWithStoreParams = {
              //  ...item[dataField],
              //  ...lookup.dataSource,
              //};
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
    const formData = e.rows[e.newRowIndex].data;
    const rowId = formData.id;

    setMasterId(rowId);
    setFormData(formData);
    setGroupItemCaption(groupItemCaption);
  }

  function customSimpleItemMarkup(formData) {
    if (!formData) {
      return;
    }

    return Object.keys(formData).map((item, idx) => {
      return <SimpleItem key={idx} dataField={item} />;
    });
  }

  function editorCustomMarkup() {
    return masterId ? (
      <Editing
        mode="popup"
        popup={popupDetailTreeListTabOptions}
        allowAdding={true}
        allowDeleting={true}
        allowUpdating={true}
        useIcons={true}
      >
        <Form id="form" formData={formData} colCount={1} width={"100%"}>
          <GroupItem caption={groupItemCaption}>
            <TabbedItem>
              <TabPanelOptions deferRendering={true} />

              <Tab title={formatMessage("msgTabAuditGeneral")} colCount={2}>
                {customSimpleItemMarkup(formData)}
              </Tab>

              <Tab title={formatMessage("msgTabAuditObjDB")} colCount={2}>
                <DatailTreeListTab
                  masterId={masterId}
                  DetailTreeListPath={"auditSettings"}
                  formData={formData}
                />
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
        useIcons={true}
      />
    );
  }

  function onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: "after",
      widget: "dxButton",
      options: {
        icon: "hierarchy",
        width: "max-content",
        text: formatMessage(expandRowsBtnText),
        onClick: clickHandler,
      },
    });
  }

  const errorMessage = errorStatus ? (
    <ErrorPopup
      errorState={errorStatus}
      popupPositionOf={`#${pathnameWithoutSlash}`}
    />
  ) : null;

  return (
    <div id="treelist-page-wrapper" className="page-wrapper">
      <h2 className={"content-block"}>
        {formatMessage(`${localPathname}HeaderTitle`, localPageAbbreviation)}
      </h2>
      {errorMessage}

      {!errorMessage && (
        <TreeList
          id={pathnameWithoutSlash}
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
          showColumnLines={false}
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
          // remoteOperations={{}}
          autoExpandAll={toggler}
          onInitNewRow={initNewRow}
          // onEditorPreparing={onEditorPreparing}
          onFocusedCellChanging={onFocusedCellChanging}
          onToolbarPreparing={onToolbarPreparing}
          // onToolbarPreparing={onToolbarPreparing}
        >
          <Scrolling mode="standard" />
          <SearchPanel visible={true} />
          {/* <HeaderFilter visible={true} allowSearch={true} /> */}
          <ColumnChooser
            enabled={true}
            allowSearch={true}
            width={300}
            height={365}
            title={formatMessage("msgColomnChooser")}
            emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
          />
          <FilterRow visible={true} />
          <StateStoring
            enabled={false}
            type="localStorage"
            storageKey="storage"
          />

          {pathnameWithoutSlash === "auditSettingsMaster" ? (
            editorCustomMarkup()
          ) : pathnameWithoutSlash === "soato" ? (
            <Editing
              mode="batch"
              popup={popupOpt}
              allowAdding={true}
              allowUpdating={true}
              allowDeleting={true}
              useIcons={true}
              startEditAction="dblClick"
            />
          ) : (
            <Editing
              mode="popup"
              popup={popupOpt}
              allowAdding={true}
              allowUpdating={true}
              allowDeleting={true}
              useIcons={true}
            />
          )}

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
          <LoadPanel
            deferRendering={true}
            enabled="true"
            shading={true}
            // shadingColor={"rgba(0, 0, 0, 0.5)"}
            showPane={false}
            width={400}
            height={140}
            message={formatMessage("msgLoadingMessage")}
            indicatorSrc={spinner}
          />
        </TreeList>
      )}
    </div>
  );
};

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

// ===========================================
// useEffect(() => {
//   async function getColumnsSchemaData() {
//     const fetchColumnsSchemaData = fetchDataConstructor("hbdb").fetchData;

//     const result = await fetchColumnsSchemaData
//       ._loadFunc()
//       .then((res) => res.data);

//     setColumnsSchemaData(result);
//     getAPIData();

//     const lookupParamsForURL = getLookupParamsForURL(result);

//     if (lookupParamsForURL.length) {
//       lookupParamsForURL.map(({sp, db, dataField}) =>
//         getLookDataState(sp, db, dataField)
//       );
//     }
//   }

//   function getAPIData() {
//     if (
//       checkIfArrIncludesValue(["auditSettingsMaster"], pathnameWithoutSlash)
//     ) {
//       const fetchData = fetchDataConstructor("logdb").fetchColumnsSchemaData;
//       return setAPIData(fetchData);
//     }

//     const fetchData = fetchDataConstructor("hbdb").fetchColumnsSchemaData;
//     setAPIData(fetchData);
//   }

//   async function getLookDataState(
//     lookupSpForURL,
//     lookupDBForURL,
//     dataField = null
//   ) {
//     const lookData = FetchData(
//       pathname,
//       lookupSpForURL,
//       lookupDBForURL
//     ).lookData;

//     await lookData.store
//       ._loadFunc()
//       .then((res) => (lookData.store.__rawData = [...res.data]));

//     setLookDataState((prev) =>
//       dataField ? [...prev, {[dataField]: lookData}] : lookData
//     );
//     // console.log(`lookData `, lookData);
//   }

//   getColumnsSchemaData();
//   // eslint-disable-next-line
// }, []);
