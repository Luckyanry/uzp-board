import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  // FilterRow,
  // Scrolling,
  ColumnChooser,
  Editing,
  // Column,
  // RequiredRule,
  // PatternRule,
  // FormItem,
  // Lookup,
  // Button,
} from "devextreme-react/data-grid";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./DetailTemplate.scss";

export const DetailTemplate = (props) => {
  const [dataState, setdataState] = useState(null);
  const [shortDicsRecordsDataState, setShortDicsRecordsDataState] =
    useState(null);
  console.log(`props`, props);

  const shortDicsRecords = FetchData(
    "/ShortDicsRecords",
    props.data.key
  ).shortDicsRecords;

  const {formatMessage} = useLocalization();
  // const pathnameToName = pathname.split("/")[1];
  // const localizedPageShortName = formatMessage(pathnameToName);

  const defaultStatus = ["Active", "Deactivated"];
  const statusesLang = defaultStatus.map((statusLang) => {
    const statusLanguage = formatMessage(statusLang);
    return statusLanguage;
  });

  useEffect(() => {
    setdataState(props.data.data.columnsjson.columns);

    shortDicsRecords
      ._loadFunc()
      .then((res) => res.data)
      .then((arr) => setShortDicsRecordsDataState(arr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initNewRow(e) {
    e.data.status = statusesLang[0];
  }

  // console.log(`dataState`, dataState);
  // console.log(`shortDicsRecordsDataState`, shortDicsRecordsDataState);

  return (
    <DataGrid
      id="grid"
      columns={dataState}
      dataSource={shortDicsRecordsDataState}
      keyExpr="id"
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

      {/* <Column dataField="dataField" /> */}

      {/* <Column
        dataField="status"
        caption={formatMessage("status")}
        alignment="center"
        width={120}
      >
        <Lookup dataSource={statusesLang} />
        <RequiredRule />
      </Column> */}
    </DataGrid>
  );
};
