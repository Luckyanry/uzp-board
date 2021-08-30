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
  const [APIData, setAPIData] = useState(null);
  const [lookDataState, setLookDataState] = useState(null);

  const {formatMessage} = useLocalization();
  const fetchData = FetchData(pathname, formatMessage).fetchData;
  const usersFetchData = FetchData(pathname, formatMessage).usersFetchData;
  const lookData = FetchData(pathname, formatMessage).lookData;

  const pathnameToName = pathname.split("/")[1];
  const localizedPageShortName = formatMessage(pathnameToName);

  const popupGeneralOptions = {
    title: formatMessage("create_new_item", localizedPageShortName),
    showTitle: true,
    width: 1000,
    height: 600,
  };

  useEffect(() => {
    pathnameToName === "usersList" ||
    pathnameToName === "usersRole" ||
    pathnameToName === "usersGroup"
      ? setAPIData(usersFetchData)
      : setAPIData(fetchData);

    const getLookDataState = async () => {
      const result = await lookData._loadFunc().then((res) => res.data);
      setLookDataState(result);
    };

    pathnameToName === "ShortDics" && getLookDataState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function statusesLang() {
    const defaultStatus = ["Active", "Deactivated"];
    const statusLanguage = defaultStatus.map((statusLang) =>
      formatMessage(statusLang)
    );
    return statusLanguage;
  }

  function initNewRow(e) {
    e.data.status = statusesLang()[0];
  }

  function customMarkupRender() {
    let murkupCollection = [];

    if (pathnameToName === "soogu") {
      const pageTitleCollection = [
        {
          value: "id",
          visible: true,
          disabled: true,
          required: false,
          width: 60,
          alignment: "right",
          formItem: true,
        },
        {value: "name_rus", required: true, width: "100%"},
        {value: "name_uzcyr", visible: false, width: "100%"},
        {value: "name_uzlat", visible: false, width: "100%"},
        {value: "name_karlat", visible: false, width: "100%"},
        {value: "name_eng", visible: false, width: "100%"},
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToName === "countries") {
      const pageTitleCollection = [
        {
          value: "id",
          visible: true,
          disabled: true,
          width: 60,
          alignment: "right",
          formItem: true,
        },
        {
          value: "short_name",
          visible: false,
          required: true,
        },
        {value: "short_name_rus", required: true},
        {value: "short_name_uzcyr"},
        {value: "short_name_uzlat"},
        {value: "short_name_karlat"},
        {value: "short_name_eng"},
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToName === "ShortDics") {
      const pageTitleCollection = [
        {
          value: "id",
          visible: false,
          disabled: true,
          width: 60,
          alignment: "right",
          formItem: true,
        },
        {value: "name", required: true, width: "100%"},
        {value: "short_name_rus", visible: false, width: "100%"},
        {value: "short_name_uzcyr", visible: false, width: "100%"},
        {value: "short_name_uzlat", visible: false, width: "100%"},
        {value: "short_name_karlat", visible: false, width: "100%"},
        {value: "short_name_eng", visible: false, width: "100%"},
        {value: "class", width: 100, alignment: "center"},
        {value: "metaid", caption: "as_child_of", lookup: true, width: "100%"},
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToName === "usersList") {
      const pageTitleCollection = [
        {value: "UserName", required: true, width: 200},
        {value: "Locale", width: 100, alignment: "center"},
        {value: "Locked", width: 120, alignment: "center"},
        {value: "Disabled", width: 100, alignment: "center"},
        {value: "TimeZone", width: "100%"},
        {value: "created", width: 200},
        {value: "pwdlastchange", width: 200},
        {value: "UserType", width: 120, alignment: "center"},
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (
      pathnameToName === "usersRole" ||
      pathnameToName === "usersGroup"
    ) {
      const pageTitleCollection = [
        {value: "UserName", required: true, width: "100%"},
        {value: "Disabled", width: 100, alignment: "center"},
        {value: "created", width: "100%"},
        {value: "UserType", width: 120, alignment: "center"},
      ];

      murkupCollection = [...pageTitleCollection];
    }

    return murkupCollection.map((item, idx) => {
      const {
        value,
        caption = value,
        visible = true,
        disabled = false,
        required = false,
        width = "auto",
        alignment = "left",
        formItem = false,
        lookup = false,
      } = item;
      return (
        <Column
          key={idx}
          dataField={value}
          caption={formatMessage(caption)}
          visible={visible}
          disabled={disabled}
          width={width}
          alignment={alignment}
        >
          {required && <RequiredRule />}
          {formItem && <FormItem visible={false} />}
          {lookup && (
            <Lookup
              dataSource={lookDataState}
              valueExpr="id"
              displayExpr="className"
            />
          )}
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
          caption: "alpha2code",
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

  return (
    <>
      <h2 className={"content-block"}>
        {formatMessage(`${pathnameToName}_title`, localizedPageShortName)}
      </h2>

      <DataGrid
        dataSource={APIData}
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
          popup={popupGeneralOptions}
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />

        {customMarkupRender()}

        {customCodeMarkupRender()}

        {pathnameToName === "ShortDics" && (
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
