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
import {sooguData} from "../../api/soogu-fetch";

import "./SooguPage.scss";

export const SooguPage = () => {
  const {formatMessage} = useLocalization();

  const statusesData = ["Активен", "Отключена"];

  function initNewRow(e) {
    console.log(`e`, e);
    e.data.status = "Активен";
    e.data.created_date = new Date();
    e.data.changed_date = new Date();
  }

  const popupOptions = {
    title: "Add a new row",
    showTitle: true,
    width: 900,
    height: 500,
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
        onInitNewRow={initNewRow}
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

        <Column dataField="name_rus" caption={formatMessage("name_rus")}>
          <RequiredRule />
        </Column>

        <Column dataField="CodeSogu" caption={formatMessage("codeSogu")}>
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
        >
          <RequiredRule />
          <PatternRule
            message={formatMessage("codeOKPO_numeric_err_message")}
            pattern={new RegExp("^[0-9]{0,8}$", "m")}
          />
        </Column>

        <Column dataField="status" caption="Status">
          <Lookup dataSource={statusesData} />
          <RequiredRule />
        </Column>

        <Paging defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          showNavigationButtons={true}
          showInfo={true}
          visible={true}
          allowedPageSizes={[10, 20, 50]}
        />
      </DataGrid>
    </>
  );
};
