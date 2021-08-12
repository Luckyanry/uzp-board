import React from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  FilterRow,
  RequiredRule,
  PatternRule,
  SearchPanel,
} from "devextreme-react/data-grid";
import {useLocalization} from "../../contexts/LocalizationContext";
import {sooguData} from "../../api/soogu-fetch";

import "./SooguPage.scss";

export const SooguPage = () => {
  const {formatMessage} = useLocalization();

  return (
    <>
      <h2 className={"content-block"}>{formatMessage("soogu")}</h2>

      <DataGrid
        dataSource={sooguData}
        // showBorders={true}
        repaintChangesOnly={true}
        remoteOperations={false}
        focusedRowEnabled={true}
        columnAutoWidth={true}
        columnHidingEnabled={false}
      >
        <SearchPanel visible={true} />
        <FilterRow visible={true} />

        <Editing
          mode="form"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />

        <Column dataField="name_rus" caption={formatMessage("name_rus")} />

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
