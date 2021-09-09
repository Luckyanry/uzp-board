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

import "./DetailUserTemplate.scss";

export const DetailUserTemplate = (props) => {
  const [APIData, setAPIData] = useState(null);
  const [userRolesFormData, setUserRolesFormData] = useState(null);

  const {formatMessage} = useLocalization();
  console.log(`props`, props);
  // const focusedRowTitle = props.data.data.name;

  // const popupOpt = {
  //   title: formatMessage("msgCreateNewItem", focusedRowTitle),
  //   showTitle: true,
  //   width: 950,
  //   height: 780,
  // };

  useEffect(() => {
    setAPIData(props.data.data.columnsjson.columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   async function getUserRolesFormData() {
  //     const usersFetchData = FetchData(
  //       formatMessage,
  //       "w_DisplayUserRoles",
  //       `w_DisplayUserRoles&@GID=${userDataGID}`,
  //       "wisdb"
  //     ).usersFetchData;

  //     const result = await usersFetchData._loadFunc().then((res) => res.data);

  //     setUserRolesFormData(result);
  //   }

  //   // checkIfArrIncludesValue(
  //   //   ["userObjects", "roleObjects", "groupObjects"],
  //   //   pathnameWithoutSlash
  //   // ) &&
  //   userDataGID && getUserRolesFormData();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userDataGID]);

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
    // <DataGrid
    //   id="grid"
    //   columns={APIData}
    //   // dataSource={shortDicsRecordsDataState}
    //   // keyExpr="id"
    //   repaintChangesOnly={true}
    //   remoteOperations={false}
    //   // rows
    //   focusedRowEnabled={true}
    //   // columns
    //   showColumnLines={true}
    //   columnMinWidth={60}
    //   columnAutoWidth={true}
    //   columnHidingEnabled={false}
    //   allowColumnResizing={true}
    //   allowColumnReordering={true}
    //   // appearance
    //   hoverStateEnabled={true}
    //   wordWrapEnabled={true}
    //   // functions
    //   onInitNewRow={initNewRow}
    // >
    //   <ColumnChooser
    //     enabled={true}
    //     allowSearch={true}
    //     width={300}
    //     height={320}
    //     title={formatMessage("msgColomnChooser")}
    //     emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
    //   />

    //   <Editing
    //     mode="batch"
    //     // popup={popupOpt}
    //     allowAdding={true}
    //     allowDeleting={true}
    //     allowUpdating={true}
    //   />

    //   <Paging defaultPageSize={10} />
    //   <Pager
    //     showPageSizeSelector={true}
    //     showNavigationButtons={true}
    //     showInfo={true}
    //     visible={true}
    //     allowedPageSizes={[10, 20, 50, 100, "all"]}
    //     showAllItem={true}
    //   />
    // </DataGrid>
    // </ErrorBoundary>
    <h1>Hello</h1>
  );
};
