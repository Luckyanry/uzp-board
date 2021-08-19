import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  // FilterRow,
  // Scrolling,
  ColumnChooser,
  Editing,
  // MasterDetail,
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

  const shortDicsRecords = FetchData("/ShortDicsRecords").shortDicsRecords;

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

  console.log(`dataState`, dataState);
  console.log(`shortDicsRecordsDataState`, shortDicsRecordsDataState);

  return (
    <DataGrid
      id="grid"
      dataSource={dataState}
      keyExpr="dataField"
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
      {/* <Scrolling mode="standard" /> */}

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

      {/* <MasterDetail enabled={true} component={DetailTemplate} /> */}

      {/* <Column
        dataField="id"
        caption="ID"
        alignment="center"
        disabled={false}
        width={60}
      >
        <FormItem visible={false} />
      </Column> */}

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

      {/* <Column type="buttons" width={110}>
          <Button
            name="edit"
            hint={formatMessage("edit_new_item", localizedPageShortName)}
          />
          <Button
            name="delete"
            hint={formatMessage("delete_new_item", localizedPageShortName)}
          />
        </Column> */}
    </DataGrid>
  );
};
