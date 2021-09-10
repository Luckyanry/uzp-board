import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  ColumnChooser,
  Editing,
  Paging,
  Pager,
} from "devextreme-react/data-grid";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";
// import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import "./DetailTemplate.scss";

export const DetailTemplate = ({data}) => {
  const [APIData, setAPIData] = useState(null);
  const [shortDicsRecordsDataState, setShortDicsRecordsDataState] =
    useState(null);
  // const [error, setError] = useState(null);

  const {formatMessage} = useLocalization();
  // console.log(`props`, data);
  // const focusedRowTitle = data.data.name;

  // const popupOpt = {
  //   title: formatMessage("msgCreateNewItem", focusedRowTitle),
  //   showTitle: true,
  //   width: 950,
  //   height: 780,
  // };

  useEffect(() => {
    const shortDicsRecords = FetchData(
      formatMessage,
      "/ShortDicsRecords",
      `ShortDicsRecords&@tid=${data.data.id}`,
      "hbdb"
    ).fetchColumnsSchemaData;

    setAPIData(data.data.columnsjson.columns);
    setShortDicsRecordsDataState(shortDicsRecords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    // <ErrorBoundary msg={error}>
    <DataGrid
      id="grid"
      columns={APIData}
      dataSource={shortDicsRecordsDataState}
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
    >
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
        // popup={popupOpt}
        allowAdding={true}
        allowDeleting={true}
        allowUpdating={true}
        startEditAction="dblClick"
      />

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
    // </ErrorBoundary>
  );
};
