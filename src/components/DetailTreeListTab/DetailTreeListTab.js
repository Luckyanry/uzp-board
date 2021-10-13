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
  LoadPanel,
} from "devextreme-react/tree-list";
import {Template} from "devextreme-react/core/template";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";
import {IconsCellRenderTemplate} from "..";
// import {ErrorPopup} from "..";

import spinner from "../Spinner/icons/spinner.svg";
import "./DetailTreeListTab.scss";
import {ColumnFixing} from "devextreme-react/data-grid";

const DetailTreeListTab = ({DetailTreeListPath, masterId}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);
  // const [errorStatus, setErrorStatus] = useState(null);

  const {formatMessage} = useLocalization();

  const pathname = `/${DetailTreeListPath}`;
  const pathnameWithoutSlash = pathname.split("/")[1];

  const popupOpt = {
    title: formatMessage("msgCreateNewItem"),
    showTitle: true,
    width: 950,
    height: 800,
  };

  useEffect(() => {
    (async function () {
      const fetchColumnsSchemaData = FetchData(
        pathname,
        `ShortDicsRecordsFlat&@name=${DetailTreeListPath}ColumnSchema`,
        "hbdb"
      ).fetchColumnsSchemaData;

      const result = await fetchColumnsSchemaData
        .load()
        .then((res) => res.data);
      // .catch((err) => setErrorStatus(err));

      setColumnsSchemaData(result);
      getAPIData();
    })();

    async function getAPIData() {
      const loadFetchData = await FetchData(
        pathname,
        `AuditSettings&@masterid=${masterId}`,
        "wisdb"
      ).loadObjIdData();

      setAPIData(loadFetchData.data);
    }
  }, [pathname, DetailTreeListPath, masterId]);

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
      console.log(`item DetailTreeListTab =>`, item);
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
          fixed={dataField === "objName" ? true : false}
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
          cellTemplate={dataField === "objName" ? "objAuditTemplate" : null}
          {...params}
        >
          {required && <RequiredRule />}

          <FormItem {...formItem} />
        </Column>
      );
    });
  }

  function updateRow(e) {
    FetchData(
      pathname,
      `AuditSettings&@masterid=${masterId}`,
      "wisdb"
    ).updateObjIdData(
      e.oldData.ObjId,
      e.oldData.dbName,
      e.oldData.objName,
      e.newData
    );
  }

  function onEditorPreparing(e) {
    switch (e.row.data.ObjType) {
      case 0: //database  block editor always
        e.cancel = true;
        break;
      case 1: // table block execs
        if (e.dataField === "auExecFail" || e.dataField === "auExecSuccess") {
          e.cancel = true;
        }
        break;
      case 2: // procedure block ins, upd, del
        if (
          e.dataField === "auInsert" ||
          e.dataField === "auUpdate" ||
          e.dataField === "auDelete"
        ) {
          e.cancel = true;
        }
        break;
      // other unknown future type block editor  always
      default:
        e.cancel = true;
    }
  }

  return (
    <TreeList
      id={pathnameWithoutSlash}
      // columns={columnsSchemaData}
      dataSource={APIData}
      rootValue={0}
      keyExpr="ObjId"
      parentIdExpr="PObjId"
      repaintChangesOnly={true}
      // remoteOperations={false}
      // rows
      focusedRowEnabled={true}
      showRowLines={true}
      rowAlternationEnabled={false}
      showBorders={true}
      // columns
      showColumnLines={true}
      // columnMinWidth={80}
      columnAutoWidth={true}
      columnHidingEnabled={false}
      allowColumnReordering={true}
      allowColumnResizing={true}
      columnResizingMode={"widget"}
      // appearance
      hoverStateEnabled={true}
      wordWrapEnabled={true}
      virtualModeEnabled={true}
      autoExpandAll={false}
      // functions
      onRowUpdating={updateRow}
      onEditorPreparing={onEditorPreparing}
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
      <ColumnFixing enabled={true} />

      <Editing
        mode="batch"
        // mode="popup"
        popup={popupOpt}
        allowAdding={false}
        allowDeleting={false}
        allowUpdating={true}
        useIcons={true}
        startEditAction="dblClick"
      />

      {customMarkupRender()}

      <Template name="objAuditTemplate" render={IconsCellRenderTemplate} />

      <Paging defaultPageSize={10} enabled={true} />
      <Pager
        showPageSizeSelector={true}
        showInfo={true}
        showNavigationButtons={true}
        allowedPageSizes={[10, 20, 50, "all"]}
        showAllItem={true}
        visible={true}
      />
      <LoadPanel
        deferRendering={true}
        enabled="true"
        shading={false}
        showPane={false}
        width={400}
        height={140}
        message={formatMessage("msgLoadingMessage")}
        indicatorSrc={spinner}
      />
    </TreeList>
  );
};

export default DetailTreeListTab;
