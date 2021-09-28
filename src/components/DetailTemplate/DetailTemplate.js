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
import {ErrorPopup, Spinner} from "..";

import "./DetailTemplate.scss";
import {setToSessionStorege} from "../../helpers/functions";

const DetailTemplate = ({data}) => {
  const [APIData, setAPIData] = useState(null);
  const [shortDicsRecordsDataState, setShortDicsRecordsDataState] =
    useState(null);

  const [allowAdding, setAllowAdding] = useState(true);
  const [allowDeleting, setAllowDeleting] = useState(true);
  const [allowUpdating, setAllowUpdating] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorTitle, setErrorTitle] = useState();

  const {formatMessage} = useLocalization();
  const focusedRowTitle = data.data.name;

  const popupOpt = {
    title: formatMessage("msgCreateNewItem", focusedRowTitle),
    showTitle: true,
    width: 950,
    height: 780,
  };

  useEffect(() => {
    const idTriger = data.component._$element[0].id;

    if (idTriger === "ShortDics") {
      setLoading(true);
      const shortDicsRecords = FetchData(
        "/ShortDicsRecords",
        `ShortDicsRecords&@tid=${data.data.id}`,
        "bdb"
      ).fetchColumnsSchemaData;

      try {
        setAPIData(data.data.columnsjson.columns);
        setShortDicsRecordsDataState(shortDicsRecords);
        setLoading(false);
      } catch (error) {
        console.log(`error `, error);
        setLoading(false);
        setToSessionStorege("error", error);

        setErrorStatus(true);
        setErrorTitle(formatMessage("msgErrServer"));
      }
    }

    if (idTriger === "recordLog") {
      try {
        setLoading(true);

        const detailFieldLogShcema = FetchData(
          "/recordLog",
          `ShortDicsRecordsFlat&@name=FieldLogColumnSchema`,
          "hbdb"
        ).fetchColumnsSchemaData;

        detailFieldLogShcema._loadFunc().then(({data}) => setAPIData(data));

        const fieldLog = FetchData(
          "/fieldLog",
          `FieldLog&@LogGID=${data.data.GID}`,
          "wisdb"
        ).usersFetchData;

        setAllowAdding(false);
        setAllowDeleting(false);
        setAllowUpdating(false);

        setShortDicsRecordsDataState(fieldLog);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setToSessionStorege("error", error);

        setErrorStatus(true);
        setErrorTitle(formatMessage("msgErrServerFetch"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const View = () => (
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
        popup={popupOpt}
        allowAdding={allowAdding}
        allowDeleting={allowDeleting}
        allowUpdating={allowUpdating}
        startEditAction="dblClick"
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
    </DataGrid>
  );

  const content = !(loading || errorStatus) ? <View /> : null;

  const errorMessage = errorStatus ? (
    <ErrorPopup
      errorState={errorStatus}
      errorTitle={errorTitle}
      popupPositionOf={"#detail-template"}
    />
  ) : null;

  const spinner = loading ? (
    <Spinner loadingState={loading} positionOf={"#content"} />
  ) : null;

  return (
    <div id={"detail-template"}>
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default DetailTemplate;
