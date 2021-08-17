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
  Lookup,
  Button,
  FormItem,
} from "devextreme-react/data-grid";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";

import "./CountriesPage.scss";

export const CountriesPage = ({location: {pathname}}) => {
  const countriesData = FetchData(pathname).fetchData;

  const {formatMessage} = useLocalization();
  const pageShortName = formatMessage("countries");

  const defaultStatus = ["Active", "Deactivated"];
  const statusesLang = defaultStatus.map((statusLang) => {
    const statusLanguage = formatMessage(statusLang);
    return statusLanguage;
  });

  const popupConfig = {
    title: formatMessage("create_new_item", pageShortName),
    showTitle: true,
    width: 900,
    height: 700,
  };

  return (
    <>
      <h2 className={"content-block"}>
        {formatMessage("countries_title", pageShortName)}
      </h2>

      <DataGrid
        dataSource={countriesData}
        // showBorders={true}
        repaintChangesOnly={true}
        remoteOperations={false}
        focusedRowEnabled={true}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        showColumnLines={true}
        allowColumnResizing={true}
        hoverStateEnabled={true}
      >
        <SearchPanel visible={true} />
        <FilterRow visible={true} />

        <Editing
          mode="popup"
          popup={popupConfig}
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />

        <Column
          dataField="id"
          caption="ID"
          alignment="center"
          disabled={true}
          width={60}
        >
          <FormItem visible={false} />
        </Column>

        <Column
          dataField="short_name"
          caption={formatMessage("short_name")}
          visible={false}
        >
          <RequiredRule />
        </Column>

        <Column
          dataField="short_name_rus"
          caption={formatMessage("short_name_rus")}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField="short_name_uzcyr"
          caption={formatMessage("short_name_uzcyr")}
        />
        <Column
          dataField="short_name_uzlat"
          caption={formatMessage("short_name_uzlat")}
        />
        <Column
          dataField="short_name_karlat"
          caption={formatMessage("short_name_karlat")}
        />
        <Column
          dataField="short_name_eng"
          caption={formatMessage("short_name_eng")}
        >
          <RequiredRule />
        </Column>

        <Column
          dataField="alpha2code"
          caption={formatMessage("alpha2code")}
          alignment="center"
          width={80}
        >
          <RequiredRule />
          <PatternRule
            message={formatMessage("alpha2code_err_message")}
            pattern={new RegExp("^[A-Z]{2}$")}
          />
        </Column>

        <Column
          dataField="alpha3code"
          caption={formatMessage("alpha3code")}
          alignment="center"
          width={80}
          visible={true}
        >
          <PatternRule
            message={formatMessage("alpha3code_err_message")}
            pattern={new RegExp("^[A-Z]{3}$")}
          />
          <RequiredRule />
        </Column>

        <Column
          dataField="numeric"
          caption={formatMessage("numeric")}
          alignment="center"
          width={100}
          visible={true}
        >
          <PatternRule
            message={formatMessage("numeric_err_message")}
            pattern={new RegExp("^[0-9]{0,4}$", "m")}
          />
        </Column>

        <Column
          dataField="status"
          caption={formatMessage("status")}
          alignment="center"
          width={120}
        >
          <Lookup dataSource={statusesLang} />
          <RequiredRule />
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
