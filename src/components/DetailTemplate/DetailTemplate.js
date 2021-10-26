import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  ColumnChooser,
  Editing,
  Paging,
  Pager,
  StateStoring,
  LoadPanel,
  ColumnFixing,
} from "devextreme-react/data-grid";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";

import "./DetailTemplate.scss";
import spinnerIcon from "../Spinner/icons/spinner.svg";

const DetailTemplate = ({data: {data, component}}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState(null);
  const [shortDicsRecordsDataState, setShortDicsRecordsDataState] =
    useState(null);

  const [allowAdding, setAllowAdding] = useState(true);
  const [allowDeleting, setAllowDeleting] = useState(true);
  const [allowUpdating, setAllowUpdating] = useState(true);

  const {formatMessage} = useLocalization();
  const focusedRowTitle = data.name;

  const popupOpt = {
    title: formatMessage("msgCreateNewItem", focusedRowTitle),
    showTitle: true,
    width: 950,
    height: 780,
  };

  const idTriger = component._$element[0].id;

  useEffect(() => {
    if (idTriger === "shortDics") {
      const shortDicsRecords = FetchData(
        "/ShortDicsRecords",
        `ShortDicsRecords&@tid=${data.id}`,
        "hbdb"
      ).fetchColumnsSchemaData;

      setColumnsSchemaData(data.columnsjson.columns);
      setShortDicsRecordsDataState(shortDicsRecords);
    }

    if (idTriger === "recordLog") {
      const detailFieldLogShcema = FetchData("/fieldLog").fetchData;

      detailFieldLogShcema.load().then(({data}) => setColumnsSchemaData(data));

      const fieldLog = FetchData(
        "/fieldLog",
        `FieldLog&@LogGID=${data.GID}`,
        "wisdb"
      ).usersFetchData;

      setAllowAdding(false);
      setAllowDeleting(false);
      setAllowUpdating(false);

      setShortDicsRecordsDataState(fieldLog);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div id={"detail-template"}>
      <DataGrid
        id={"detail-template-grid"}
        dataSource={shortDicsRecordsDataState}
        columns={columnsSchemaData}
        repaintChangesOnly={true}
        // remoteOperations={false}
        remoteOperations={
          idTriger === "recordLog" ? {paging: true, sorting: true} : false
        }
        // === rows ===
        focusedRowEnabled={true}
        // === columns ===
        showColumnLines={true}
        columnMinWidth={60}
        columnAutoWidth={true}
        columnHidingEnabled={false}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnResizingMode={"widget"}
        // === appearance ===
        hoverStateEnabled={true}
        wordWrapEnabled={true}
        // === functions ===
      >
        <ColumnChooser
          enabled={true}
          allowSearch={true}
          width={300}
          height={320}
          title={formatMessage("msgColomnChooser")}
          emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
        />

        <StateStoring
          enabled={false}
          type="localStorage"
          storageKey="storage"
        />

        <ColumnFixing enabled={true} />

        <Editing
          mode="batch"
          popup={popupOpt}
          allowAdding={allowAdding}
          allowDeleting={allowDeleting}
          allowUpdating={allowUpdating}
          startEditAction="dblClick"
          useIcons={true}
        />

        <Paging defaultPageSize={10} enabled={true} />
        <Pager
          showPageSizeSelector={true}
          showNavigationButtons={true}
          showInfo={true}
          visible={true}
          allowedPageSizes={[10, 20, 50, 100, "all"]}
          showAllItem={true}
        />
        <LoadPanel
          deferRendering={true}
          enabled="true"
          shading={false}
          showPane={false}
          width={400}
          height={140}
          message={formatMessage("msgLoadingMessage")}
          indicatorSrc={spinnerIcon}
        />
      </DataGrid>
    </div>
  );
};

export default DetailTemplate;
