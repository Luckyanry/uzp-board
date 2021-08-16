import React from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  FilterRow,
  HeaderFilter,
  RequiredRule,
  PatternRule,
  SearchPanel,
  Lookup,
} from "devextreme-react/data-grid";
import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";

import "./SooguPage.scss";

export const SooguPage = ({location: {pathname}}) => {
  const {formatMessage} = useLocalization();
  const sooguData = FetchData(pathname).fetchData;

  const defaultStatus = ["Active", "Deactivated"];
  const statusesLang = defaultStatus.map((statusLang) => {
    const statusLanguage = formatMessage(statusLang);
    return statusLanguage;
  });

  // function initNewRow(e) {
  //   console.log(`e`, e);
  //   e.data.status = "Активен";
  //   e.data.created_date = new Date();
  //   e.data.changed_date = new Date();
  // }

  const popupOptions = {
    title: formatMessage("new_row"),
    showTitle: true,
    width: 1000,
    height: 600,
  };

  return (
    <>
      <h2 className={"content-block"}>{formatMessage("soogu_title")}</h2>

      <DataGrid
        dataSource={sooguData}
        // showBorders={true}
        repaintChangesOnly={true}
        remoteOperations={false}
        focusedRowEnabled={true}
        columnAutoWidth={true}
        columnHidingEnabled={false}
        allowColumnResizing={true}
        showColumnLines={true}
        hoverStateEnabled={true}
        // onInitNewRow={initNewRow}
        wordWrapEnabled={true}
      >
        <SearchPanel visible={true} />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} allowSearch={true} />

        <Editing
          mode="popup"
          popup={popupOptions}
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />

        <Column
          dataField="name_rus"
          caption={formatMessage("name_rus")}
          // width="resize"
        >
          <RequiredRule />
        </Column>

        <Column
          dataField="name_uzcyr"
          caption={formatMessage("name_uzcyr")}
          visible={false}
        />
        <Column
          dataField="name_uzlat"
          caption={formatMessage("name_uzlat")}
          visible={false}
        />
        <Column
          dataField="name_karlat"
          caption={formatMessage("name_karlat")}
          visible={false}
        />
        <Column
          dataField="name_eng"
          caption={formatMessage("name_eng")}
          visible={false}
        />

        <Column
          dataField="CodeSogu"
          caption={formatMessage("code_sogu")}
          alignment="left"
          width={120}
        >
          <RequiredRule />
          <PatternRule
            message={formatMessage("codeSogu_numeric_err_message")}
            pattern={new RegExp("^[0-9]{4,5}$", "m")}
          />
        </Column>

        <Column
          dataField="CodeOKPO"
          caption={formatMessage("codeOKPO")}
          alignment="left"
          width={120}
        >
          <RequiredRule />
          <PatternRule
            message={formatMessage("codeOKPO_numeric_err_message")}
            pattern={new RegExp("^[0-9]{0,8}$", "m")}
          />
        </Column>

        <Column
          dataField="status"
          caption={formatMessage("status")}
          alignment="center"
          width={120}
        >
          <RequiredRule />
          <Lookup dataSource={statusesLang} />
        </Column>

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
    </>
  );
};
