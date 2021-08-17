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
  Button,
  FormItem,
} from "devextreme-react/data-grid";
import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";

import "./SooguPage.scss";

export const SooguPage = ({location: {pathname}}) => {
  const sooguData = FetchData(pathname).fetchData;

  const {formatMessage} = useLocalization();
  const pageShortName = formatMessage("soogu");
  const titleOKPO = formatMessage("sogogu_okpo_title");

  const defaultStatus = ["Active", "Deactivated"];
  const statusesLang = defaultStatus.map((statusLang) => {
    const statusLanguage = formatMessage(statusLang);
    return statusLanguage;
  });

  const popupOptions = {
    title: formatMessage("create_new_item", pageShortName),
    showTitle: true,
    width: 1000,
    height: 600,
  };

  function initNewRow(e) {
    console.log(`e`, e);
    e.data.status = statusesLang[0];
  }

  return (
    <>
      <h2 className={"content-block"}>
        {formatMessage("soogu_title", pageShortName)}
      </h2>

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
        wordWrapEnabled={true}
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

        <Column
          dataField="id"
          caption="ID"
          alignment="center"
          disabled={true}
          width={80}
        >
          <FormItem visible={false} />
        </Column>

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
          caption={formatMessage("code_sogu", pageShortName)}
          alignment="left"
          width={120}
        >
          <PatternRule
            message={formatMessage(
              "codeSogu_numeric_err_message",
              pageShortName
            )}
            pattern={new RegExp("^[0-9]{4,5}$", "m")}
          />
          <RequiredRule />
        </Column>

        <Column
          dataField="CodeOKPO"
          caption={formatMessage("codeOKPO", titleOKPO)}
          alignment="left"
          width={120}
        >
          <RequiredRule />
          <PatternRule
            message={formatMessage("codeOKPO_numeric_err_message", titleOKPO)}
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

        <Column type="buttons" width={110}>
          <Button
            name="edit"
            hint={formatMessage("edit_new_item", pageShortName)}
          />
          <Button
            name="delete"
            hint={formatMessage("delete_new_item", pageShortName)}
          />
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
