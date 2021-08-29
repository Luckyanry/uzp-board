import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {ColumnChooser, Editing} from "devextreme-react/data-grid";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./DetailTemplate.scss";

export const DetailTemplate = (props) => {
  const [APIData, setAPIData] = useState(null);
  const [shortDicsRecordsDataState, setShortDicsRecordsDataState] =
    useState(null);
  console.log(`props`, props);

  const {formatMessage} = useLocalization();

  const shortDicsRecords = FetchData(
    "/ShortDicsRecords",
    formatMessage,
    props.data.data.id
  ).fetchData;

  useEffect(() => {
    setAPIData(props.data.data.columnsjson.columns);

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

  // console.log(`APIData`, APIData);
  console.log(`shortDicsRecordsDataState`, shortDicsRecordsDataState);

  return (
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
        mode="batch"
        allowAdding={true}
        allowDeleting={true}
        allowUpdating={true}
      />
    </DataGrid>
  );
};
