import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {ColumnChooser, Editing} from "devextreme-react/data-grid";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";
// import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import "./DetailTemplate.scss";

export const DetailTemplate = (props) => {
  const [APIData, setAPIData] = useState(null);
  const [shortDicsRecordsDataState, setShortDicsRecordsDataState] =
    useState(null);
  // const [error, setError] = useState(null);

  const {formatMessage} = useLocalization();
  console.log(`DetailTemplate props`, props);

  const focusedRowTitle = props.data.data.name;

  const popupOpt = {
    title: formatMessage("create_new_item", focusedRowTitle),
    showTitle: true,
    width: 950,
    height: 780,
  };

  const shortDicsRecords = FetchData(
    "/ShortDicsRecords",
    formatMessage,
    props.data.data.id
  ).fetchData;

  useEffect(() => {
    setAPIData(props.data.data.columnsjson.columns);

    // shortDicsRecords._loadFunc().then(
    //   (res) => res.data,
    //   (err) => {
    //     console.log(`err => `, err);
    //     setError(err);
    //   }
    // );

    setShortDicsRecordsDataState(shortDicsRecords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function statusesLang() {
    const defaultStatus = ["Active", "Deactivated"];
    const statusLanguage = defaultStatus.map((statusLang) =>
      formatMessage(statusLang)
    );
    return statusLanguage;
  }

  function initNewRow(e) {
    e.data.status = statusesLang()[0];
  }
  // console.log(`error`, error);
  // function onFocusedCellAction(e) {
  //   const rowId = e.rows[e.newRowIndex].values[0];
  //   // const rowName = rowId.data.name;
  //   console.log(`rowName`, e);
  //   setFocusedRowName(rowId);
  // }

  return (
    // <ErrorBoundary msg={error}>
    <DataGrid
      id="grid"
      columns={APIData}
      dataSource={shortDicsRecordsDataState}
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
      // onFocusedCellChanging={onFocusedCellAction}
    >
      <ColumnChooser
        enabled={true}
        allowSearch={true}
        width={300}
        height={320}
        title={formatMessage("colomn_chooser")}
        emptyPanelText={formatMessage("colomn_chooser_empty_text")}
      />

      <Editing
        mode="popup"
        popup={popupOpt}
        allowAdding={true}
        allowDeleting={true}
        allowUpdating={true}
      />
    </DataGrid>
    // </ErrorBoundary>
  );
};
