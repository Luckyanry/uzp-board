import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import TreeList, {
  ColumnChooser,
  Editing,
  Column,
  RequiredRule,
  FormItem,
  Paging,
  Pager,
  StateStoring,
  Scrolling,
} from "devextreme-react/tree-list";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";

// import Database_16x from "./icons/Database_16x.png";
// import DatabaseStoredProcedures_16x from "./icons/DatabaseStoredProcedures_16x.png";
// import Table_16x from "./icons/Table_16x.png";
import "./DetailTreeListTab.scss";
import {LoadPanel} from "devextreme-react/data-grid";

const DetailTreeListTab = ({DetailTreeListPath, masterId}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);

  const {formatMessage} = useLocalization();

  const pathname = `/${DetailTreeListPath}`;

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

      setColumnsSchemaData(result);
      getAPIData();
    }

    async function getAPIData() {
      const getFetchData = FetchData(
        pathname,
        `AuditSettings&@masterid=${masterId}`,
        "wisdb"
      ).ObjIdFetchData;

      setAPIData(getFetchData);
    }

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
          trueText={formatMessage("msgOn")}
          falseText={formatMessage("msgOff")}
          cellTemplate={dataField === "icon" ? "iconTemplate" : null}
          {...params}
        >
          {required && <RequiredRule />}

          <FormItem {...formItem} />
        </Column>
      );
    });
  }

  function onDataErrorEvent(e) {
    e.error.message = formatMessage("msgErrUserDetailRoleGroup");
  }

  function updateRow(e) {
    updateFetch(
      e.oldData.ObjId,
      e.oldData.dbName,
      e.oldData.objName,
      e.newData
    );
  }

  return (
    <TreeList
      id="grid"
      // columns={columnsSchemaData}
      dataSource={APIData}
      rootValue={0}
      keyExpr="ObjId"
      parentIdExpr="PObjId"
      // repaintChangesOnly={true}
      // remoteOperations={false}
      // rows
      focusedRowEnabled={true}
      showRowLines={true}
      rowAlternationEnabled={false}
      showBorders={true}
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
      virtualModeEnabled={true}
      autoExpandAll={false}
      // functions
      onDataErrorOccurred={onDataErrorEvent}
      onRowUpdating={updateRow}
      // onFocusedCellChanging={onFocusedCellChanging}
    >
      <Scrolling mode="standard" useNative="true" />
      <StateStoring enabled={false} type="localStorage" storageKey="storage" />
      <ColumnChooser
        enabled={true}
        allowSearch={true}
        width={300}
        height={320}
        title={formatMessage("msgColomnChooser")}
        emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
      />

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

      <Paging defaultPageSize={10} enabled={true} />
      <Pager
        showPageSizeSelector={true}
        showInfo={true}
        showNavigationButtons={true}
        allowedPageSizes={[10, 20, 50, 100, "all"]}
        showAllItem={true}
        visible={true}
      />
      <LoadPanel enabled="true" />
    </TreeList>
  );
};

export default DetailTreeListTab;
