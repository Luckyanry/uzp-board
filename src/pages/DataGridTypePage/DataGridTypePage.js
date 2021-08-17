import React from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  SearchPanel,
  // HeaderFilter,
  FilterRow,
  Scrolling,
  ColumnChooser,
  Editing,
  Column,
  RequiredRule,
  PatternRule,
  FormItem,
  Lookup,
  Button,
  Paging,
  Pager,
} from "devextreme-react/data-grid";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";

import "./DataGridTypePage.scss";

export const DataGridTypePage = ({location: {pathname}}) => {
  const fetchData = FetchData(pathname).fetchData;

  const {formatMessage} = useLocalization();
  const pathnameToName = pathname.split("/")[1];
  const localizedPageShortName = formatMessage(pathnameToName);

  const defaultStatus = ["Active", "Deactivated"];
  const statusesLang = defaultStatus.map((statusLang) => {
    const statusLanguage = formatMessage(statusLang);
    return statusLanguage;
  });

  const popupGeneralOptions = {
    title: formatMessage("create_new_item", localizedPageShortName),
    showTitle: true,
    width: 1000,
  };

  const sooguPopupOptions = {
    ...popupGeneralOptions,
    height: 600,
  };

  const countriesPopupOptions = {
    ...popupGeneralOptions,
    height: 700,
  };

  function editingOption() {
    return pathnameToName === "soogu"
      ? sooguPopupOptions
      : countriesPopupOptions;
  }

  function initNewRow(e) {
    e.data.status = statusesLang[0];
  }

  function customMarkupRender() {
    let murkupCollection = [];

    if (pathnameToName === "soogu") {
      const pageTitleCollection = [
        {value: "name_rus", visible: true, required: true},
        {value: "name_uzcyr", visible: false, required: false},
        {value: "name_uzlat", visible: false, required: false},
        {value: "name_karlat", visible: false, required: false},
        {value: "name_eng", visible: false, required: false},
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToName === "countries") {
      const pageTitleCollection = [
        {value: "short_name", visible: false, required: true},
        {value: "short_name_rus", visible: true, required: true},
        {value: "short_name_uzcyr", visible: true, required: false},
        {value: "short_name_uzlat", visible: true, required: false},
        {value: "short_name_karlat", visible: true, required: false},
        {value: "short_name_eng", visible: true, required: true},
      ];

      murkupCollection = [...pageTitleCollection];
    }

    return murkupCollection.map((item, idx) => {
      const {value, visible, required} = item;
      return (
        <Column
          key={idx}
          dataField={value}
          caption={formatMessage(value)}
          visible={visible}
        >
          {required && <RequiredRule />}
        </Column>
      );
    });
  }

  function customCodeMarkupRender() {
    let murkupCollection = [];

    if (pathnameToName === "soogu") {
      const pageTitleCollection = [
        {
          dataField: "CodeSogu",
          caption: "code_soogu",
          width: 120,
          message: "codeSogu_numeric_err_message",
          pattern: "^[0-9]{4,5}$",
          required: true,
        },
        {
          dataField: "CodeOKPO",
          caption: "codeOKPO",
          width: 120,
          message: "codeOKPO_numeric_err_message",
          pattern: "^[0-9]{0,8}$",
          required: true,
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToName === "countries") {
      const pageTitleCollection = [
        {
          dataField: "alpha2code",
          caption: "alpha3code",
          width: 80,
          message: "alpha2code_err_message",
          pattern: "^[A-Z]{2}$$",
          required: true,
        },
        {
          dataField: "alpha3code",
          caption: "alpha3code",
          width: 80,
          message: "alpha3code_err_message",
          pattern: "^[A-Z]{3}$",
          required: true,
        },
        {
          dataField: "numeric",
          caption: "numeric",
          width: 100,
          message: "numeric_err_message",
          pattern: "^[0-9]{0,4}$",
          required: false,
        },
      ];

      murkupCollection = [...pageTitleCollection];
    }

    return murkupCollection.map((item, idx) => {
      const {dataField, caption, width, message, pattern, required} = item;

      return (
        <Column
          key={idx}
          dataField={dataField}
          caption={formatMessage(caption)}
          alignment="center"
          width={width}
          visible={true}
        >
          <PatternRule
            message={formatMessage(message)}
            pattern={new RegExp(pattern)}
          />
          {required && <RequiredRule />}
        </Column>
      );
    });
  }

  return (
    <>
      <h2 className={"content-block"}>
        {formatMessage(`${pathnameToName}_title`, localizedPageShortName)}
      </h2>

      <DataGrid
        dataSource={fetchData}
        repaintChangesOnly={true}
        remoteOperations={false}
        // rows
        focusedRowEnabled={true}
        // columns
        columnAutoWidth={true}
        columnHidingEnabled={false}
        allowColumnResizing={true}
        showColumnLines={true}
        // appearance
        hoverStateEnabled={true}
        wordWrapEnabled={true}
        // functions
        onInitNewRow={initNewRow}
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} />
        {/* <HeaderFilter visible={true} allowSearch={true} /> */}
        <ColumnChooser enabled={true} />
        <FilterRow visible={true} />

        <Editing
          mode="popup"
          popup={editingOption()}
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

        {customMarkupRender()}

        {customCodeMarkupRender()}

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
            hint={formatMessage("edit_new_item", localizedPageShortName)}
          />
          <Button
            name="delete"
            hint={formatMessage("delete_new_item", localizedPageShortName)}
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
