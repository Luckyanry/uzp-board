import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import TreeList, {
  ColumnChooser,
  Editing,
  Column,
  RequiredRule,
  FormItem,
  Lookup,
  Button,
  Paging,
  Pager,
  StateStoring,
  Scrolling,
} from "devextreme-react/tree-list";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";

import Database_16x from "./icons/Database_16x.png";
import DatabaseStoredProcedures_16x from "./icons/DatabaseStoredProcedures_16x.png";
import Table_16x from "./icons/Table_16x.png";
import "./DetailTreeListTab.scss";
import {Template} from "devextreme-react/core/template";

const DetailTreeListTab = ({DetailTreeListPath, masterId}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);

  // const [ID, setID] = useState("");
  // const [FormData, setFormData] = useState(null);
  // const [GroupItemCaption, setGroupItemCaption] = useState("");

  const {formatMessage} = useLocalization();
  // console.log(`props => `, GID, UserName);

  const pathname = `/${DetailTreeListPath}`;
  // const focusedRowTitle = UserName;

  const popupOpt = {
    title: formatMessage("msgCreateNewItem"),
    showTitle: true,
    width: 950,
    height: 800,
  };

  useEffect(() => {
    async function getColumnsSchemaData() {
      const fetchColumnsSchemaData = FetchData(
        pathname,
        `ShortDicsRecordsFlat&@name=${DetailTreeListPath}ColumnSchema`,
        "hbdb"
      ).fetchColumnsSchemaData;

      const result = await fetchColumnsSchemaData
        ._loadFunc()
        .then((res) => res.data);

      console.log(`result `, result);
      setColumnsSchemaData(result);
      getAPIData();
    }

    async function getAPIData() {
      const getFetchData = FetchData(
        pathname,
        `AuditSettings&@masterid=${masterId}`,
        "wisdb"
      ).ObjIdFetchData;

      console.log(`getFetchData`, getFetchData);

      setAPIData(getFetchData);
    }

    console.log(`APIData`, APIData);

    getColumnsSchemaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateFetch(ObjId, dbName, objName, values) {
    APIData._updateFunc(ObjId, dbName, objName, values);
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
        minWidth = 80,
        alignment = "left",
        formItem = false,
        // lookup = false,
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
          cellTemplate={dataField === "icon" ? "iconTemplate" : null}
          {...params}
        >
          {required && <RequiredRule />}

          <FormItem {...formItem} />

          {/* {lookup &&
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
            })} */}
        </Column>
      );
    });
  }

  function onDataErrorEvent(e) {
    e.error.message = formatMessage("msgErrUserDetailRoleGroup");
    // console.log(`onDataErrorEvent e `, e);
  }

  // function onFocusedCellChanging(e) {
  //   const formData = e.rows[e.newRowIndex].data;
  //   const rowId = formData.GID;
  //   const groupItemCaption = formData.UserName;

  //   setID(rowId);
  //   setFormData(FormData);
  //   setGroupItemCaption(groupItemCaption);
  // }

  function updateRow(e) {
    console.log(`e `, e);
    updateFetch(
      e.oldData.ObjId,
      e.oldData.dbName,
      e.oldData.objName,
      e.newData
    );
  }

  // function iconCell(options) {
  //   const employee = options.data;
  //   if (!employee) {
  //     return <span className="name">not assigned</span>;
  //   }

  //   return (
  //     <>
  //       <div
  //         className="img"
  //         style={{backgroundImage: `url(${employee.icon})`}}
  //       />
  //       &nbsp;
  //       <span className="name">{employee.objName}</span>
  //     </>
  //   );
  // }

  return (
    // <ErrorBoundary msg={error}>
    <TreeList
      id="grid"
      // columns={columnsSchemaData}
      rootValue={0}
      keyExpr="ObjId"
      parentIdExpr="PObjId"
      dataSource={APIData}
      repaintChangesOnly={true}
      // remoteOperations={false}
      // rows
      focusedRowEnabled={true}
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
      showBorders={true}
      // functions
      onDataErrorOccurred={onDataErrorEvent}
      onRowUpdating={updateRow}
      // onFocusedCellChanging={onFocusedCellChanging}
    >
      <ColumnChooser
        enabled={true}
        allowSearch={true}
        width={300}
        height={320}
        title={formatMessage("msgColomnChooser")}
        emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
      />
      <Scrolling mode="standard" useNative="true" />
      <StateStoring enabled={false} type="localStorage" storageKey="storage" />

      <Editing
        mode="batch"
        // mode="popup"
        popup={popupOpt}
        allowAdding={false}
        allowDeleting={false}
        allowUpdating={true}
        startEditAction="dblClick"
      />

      {customMarkupRender()}
      {/* <Template name="iconTemplate" render={iconCell} /> */}

      <Paging defaultPageSize={5} />
      <Pager
        showPageSizeSelector={true}
        showNavigationButtons={true}
        showInfo={true}
        visible={true}
        allowedPageSizes={[5, 20, 50, 100, "all"]}
        showAllItem={true}
      />
    </TreeList>
    // </ErrorBoundary>
  );
};

export default DetailTreeListTab;
