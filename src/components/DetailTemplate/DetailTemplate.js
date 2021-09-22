import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  ColumnChooser,
  Editing,
  Paging,
  Pager,
  StateStoring,
} from "devextreme-react/data-grid";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";
// import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import "./DetailTemplate.scss";

const DetailTemplate = ({data}) => {
  const [APIData, setAPIData] = useState(null);
  const [shortDicsRecordsDataState, setShortDicsRecordsDataState] =
    useState(null);
  const [allowAdding, setAllowAdding] = useState(true);
  const [allowDeleting, setAllowDeleting] = useState(true);
  const [allowUpdating, setAllowUpdating] = useState(true);
  // const [error, setError] = useState(null);

  const {formatMessage} = useLocalization();
  console.log(`props`, data);
  // const focusedRowTitle = data.data.name;

  // const popupOpt = {
  //   title: formatMessage("msgCreateNewItem", focusedRowTitle),
  //   showTitle: true,
  //   width: 950,
  //   height: 780,
  // };

  useEffect(() => {
    const idTriger = data.component._$element[0].id;
    console.log(`idTriger`, idTriger);
    if (idTriger === "ShortDics") {
      const shortDicsRecords = FetchData(
        "/ShortDicsRecords",
        `ShortDicsRecords&@tid=${data.data.id}`,
        "hbdb"
      ).fetchColumnsSchemaData;

      setAPIData(data.data.columnsjson.columns);
      setShortDicsRecordsDataState(shortDicsRecords);
    }

    if (idTriger === "recordLog") {
      const detailFieldLogShcema = FetchData(
        "/recordLog",
        `ShortDicsRecordsFlat&@name=FieldLogColumnSchema`,
        "hbdb"
      ).fetchColumnsSchemaData;

      detailFieldLogShcema
        ._loadFunc()
        .then((result) => setAPIData(result.data));

      const fieldLog = FetchData(
        "/fieldLog",
        `FieldLog&@LogGID=${data.data.GID}`,
        "wisdb"
      ).usersFetchData;

      setAllowAdding(false);
      setAllowDeleting(false);
      setAllowUpdating(false);

      setShortDicsRecordsDataState(fieldLog);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    >
      <ColumnChooser
        enabled={true}
        allowSearch={true}
        width={300}
        height={320}
        title={formatMessage("msgColomnChooser")}
        emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
      />

      <StateStoring enabled={false} type="localStorage" storageKey="storage" />

      <Editing
        mode="batch"
        // popup={popupOpt}
        allowAdding={allowAdding}
        allowDeleting={allowDeleting}
        allowUpdating={allowUpdating}
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

export default DetailTemplate;
