import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  ColumnChooser,
  Editing,
  Paging,
  Pager,
  StateStoring,
  LoadPanel,
} from "devextreme-react/data-grid";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";
// import {ErrorPopup} from "..";

import "./DetailTemplate.scss";
import {
  // getFromSessionStorege,
  setToSessionStorege,
} from "../../helpers/functions";
import spinnerIcon from "../Spinner/icons/spinner.svg";

const DetailTemplate = ({data: {data, component}}) => {
  const [APIData, setAPIData] = useState(null);
  const [shortDicsRecordsDataState, setShortDicsRecordsDataState] =
    useState(null);

  const [allowAdding, setAllowAdding] = useState(true);
  const [allowDeleting, setAllowDeleting] = useState(true);
  const [allowUpdating, setAllowUpdating] = useState(true);

  // const [errorStatus, setErrorStatus] = useState(false);
  // const [errorTitle, setErrorTitle] = useState();

  const {formatMessage} = useLocalization();
  const focusedRowTitle = data.name;

  const popupOpt = {
    title: formatMessage("msgCreateNewItem", focusedRowTitle),
    showTitle: true,
    width: 950,
    height: 780,
  };

  useEffect(() => {
    const idTriger = component._$element[0].id;

    if (idTriger === "ShortDics") {
      const shortDicsRecords = FetchData(
        "/ShortDicsRecords",
        `ShortDicsRecords&@tid=${data.id}`,
        "hbdb"
      ).fetchColumnsSchemaData;

      setAPIData(data.columnsjson.columns);
      setShortDicsRecordsDataState(shortDicsRecords);

      // const res = getFromSessionStorege("error", "");
      // if (res.JSONErrorMessage) {
      //   setErrorStatus(true);
      //   setErrorTitle(formatMessage("msgErrServerFetch"));
      // }
    }

    if (idTriger === "recordLog") {
      const detailFieldLogShcema = FetchData(
        "/recordLog",
        `ShortDicsRecordsFlat&@name=FieldLogColumnSchema`,
        "hbdb"
      ).fetchColumnsSchemaData;

      detailFieldLogShcema
        ._loadFunc()
        .then(({data}) => setAPIData(data))
        .catch((error) => {
          setToSessionStorege("error", error);
          // setErrorStatus(error);
          // setErrorTitle(formatMessage("msgErrServerFetch"));
        });

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

  // const errorMessage = errorStatus ? (
  //   <ErrorPopup
  //     errorState={errorStatus}
  //     popupPositionOf={`#detail-template-grid`}
  //     errorTitle={errorTitle}
  //   />
  // ) : null;

  return (
    <div id={"detail-template"}>
      <DataGrid
        id={"detail-template-grid"}
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

        <StateStoring
          enabled={false}
          type="localStorage"
          storageKey="storage"
        />

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
