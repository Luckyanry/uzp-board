import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  SearchPanel,
  // HeaderFilter,
  FilterRow,
  Scrolling,
  ColumnChooser,
  Editing,
  MasterDetail,
  Column,
  RequiredRule,
  PatternRule,
  FormItem,
  Lookup,
  Button,
  Paging,
  Pager,
} from "devextreme-react/data-grid";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";
import {DetailTemplate} from "../../components/DetailTemplate/DetailTemplate";

import "./DataGridTypePage.scss";

export const DataGridTypePage = ({location: {pathname}}) => {
  const [fetchDataState, setFetchDataState] = useState(null);
  const [lookDataState, setLookDataState] = useState(null);

  const fetchData = FetchData(pathname).fetchData;
  const lookData = FetchData(pathname).lookData;

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
    hint: "Test",
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

  useEffect(() => {
    setFetchDataState(fetchData);

    pathnameToName === "shortDics" &&
      lookData
        ._loadFunc()
        .then((res) => res.data)
        .then((arr) => setLookDataState(arr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    } else if (pathnameToName === "shortDics") {
      const pageTitleCollection = [
        {value: "name", visible: true, required: true},
        {value: "short_name_rus", visible: false, required: false},
        {value: "short_name_uzcyr", visible: false, required: false},
        {value: "short_name_uzlat", visible: false, required: false},
        {value: "short_name_karlat", visible: false, required: false},
        {value: "short_name_eng", visible: false, required: false},
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
          pattern: "^[A-Z]{2}$",
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

  // const onFocusedCellAction = (e) => {
  //   const focusedRowId = e.rows[e.newRowIndex].key;
  //   getFocusedRowId(focusedRowId);
  //   // console.log(`onFocusedCellChanging(e.newRowIndex) => `, e.newRowIndex);
  // };

  return (
    <>
      <h2 className={"content-block"}>
        {formatMessage(`${pathnameToName}_title`, localizedPageShortName)}
      </h2>

      <DataGrid
        dataSource={fetchDataState}
        // keyExpr="id"
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
        onInitNewRow={initNewRow}
        // onFocusedCellChanging={onFocusedCellAction}
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} width={250} />
        {/* <HeaderFilter visible={true} allowSearch={true} /> */}
        <ColumnChooser
          enabled={true}
          allowSearch={true}
          width={300}
          height={320}
          title={formatMessage("colomn_chooser")}
          emptyPanelText={formatMessage("colomn_chooser_empty_text")}
        />
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

        {pathnameToName === "shortDics" && (
          <Column
            dataField="metaid"
            caption={formatMessage("as_child_of")}
            visible={false}
          >
            <Lookup
              dataSource={lookDataState}
              valueExpr="id"
              displayExpr="className"
            />
          </Column>
        )}

        {/* {pathnameToName !== "shortDics" && (
          <Column
            dataField="status"
            caption={formatMessage("status")}
            alignment="center"
            width={120}
          >
            <Lookup dataSource={statusesLang} />
            <RequiredRule />
          </Column>
        )} */}

        {pathnameToName === "shortDics" && (
          <MasterDetail enabled={true} component={DetailTemplate} />
        )}

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
