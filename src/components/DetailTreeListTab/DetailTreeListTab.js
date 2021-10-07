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
// import {ErrorPopup} from "..";

import databaseIcon from "./icons/databaseIcon.svg";
import tableIcon from "./icons/tableIcon.svg";
import terminalIcon from "./icons/terminalIcon.svg";
import spinner from "../Spinner/icons/spinner.svg";
import "./DetailTreeListTab.scss";

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
        ._loadFunc()
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
          // cellRender={dataField === "icon" ? cellRender : null}
          cellTemplate={dataField === "objName" ? "objAuditTemplate" : null}
          {...params}
        >
          {required && <RequiredRule />}

          <FormItem {...formItem} />
        </Column>
      );
    });
  }

  function cellRender({data: {icon, objName}}) {
    console.log("cellRender => ", icon, objName);

    const icons =
      (icon === "Database_16x.png" && databaseIcon) ||
      (icon === "DatabaseStoredProcedures_16x.png" && terminalIcon) ||
      (icon === "Table_16x.png" && tableIcon);

    const styles = {
      bgIcon: {
        display: "inline-block",
        width: "16px",
        height: "16px",
        background: `url("${icons}") 0% 0% / 100% no-repeat`,
      },
    };

    return (
      <>
        <div className="img" style={styles.bgIcon} />
        &nbsp;&nbsp;
        <span className="name">{objName}</span>
      </>
    );
    // return <img src={icon} alt={data.value} />;
  }

  function onDataErrorEvent(e) {
    e.error.message = formatMessage("msgErrUserDetailRoleGroup");
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

  // const errorMessage = errorStatus ? (
  //   <ErrorPopup
  //     errorState={errorStatus}
  //     popupPositionOf={`#${pathnameWithoutSlash}`}
  //   />
  // ) : null;

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
        useIcons={true}
        startEditAction="dblClick"
      />

      {customMarkupRender()}

      <Template name="objAuditTemplate" render={cellRender} />

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
