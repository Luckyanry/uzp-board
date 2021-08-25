import React, {useEffect, useState} from "react";

import TreeList, {
  SearchPanel,
  HeaderFilter,
  FilterRow,
  Scrolling,
  ColumnChooser,
  Editing,
  Column,
  RequiredRule,
  PatternRule,
  Lookup,
  Button as TreeListButton,
  Paging,
  Pager,
} from "devextreme-react/tree-list";
import Button from "devextreme-react/button";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./TreeListTypePage.scss";

export const TreeListTypePage = ({location: {pathname}}) => {
  const [toggler, setToggler] = useState(false);
  const [APIData, setAPIData] = useState(null);
  const [lookDataState, setLookDataState] = useState(null);
  const [stateOfRows, setStateOfRows] = useState("expand");
  // const [expandedRowKeys, setExpandedRowKeys] = useState([1, 3, 5]);

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

  const popupOpt = {
    title: formatMessage("create_new_item", localizedPageShortName),
    showTitle: true,
    width: 950,
    height: 780,
  };

  useEffect(() => {
    setAPIData(fetchData);

    lookData
      ._loadFunc()
      .then((res) => res.data)
      .then((arr) => setLookDataState([...arr]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initNewRow(e) {
    e.data.status = statusesLang[0];
  }

  function clickHandler() {
    setToggler((toggler) => !toggler);
    setStateOfRows(() =>
      stateOfRows === "minimised" ? "expand" : "minimised"
    );

    if (toggler) {
      window.location.reload();
    }
  }

  function customMarkupRender() {
    let columnsTitleCollection = [];

    if (
      pathnameToName === "kopf" ||
      pathnameToName === "kspd" ||
      pathnameToName === "kfs" ||
      pathnameToName === "oked"
    ) {
      const pageTitleCollection = [
        "name_rus",
        "name_uzcyr",
        "name_uzlat",
        "name_karlat",
        "name_eng",
      ];
      columnsTitleCollection = [...pageTitleCollection];
    } else if (pathnameToName === "soato") {
      const pageTitleCollection = [
        "territory_name_rus",
        "territory_name_uzcyr",
        "territory_name_uzlat",
        "territory_name_karlat",
        "territory_name_eng",
        "admin_centre_rus",
        "admin_centre_uzcyr",
        "admin_centre_uzlat",
        "admin_centre_karlat",
        "admin_centre_eng",
      ];
      columnsTitleCollection = [...pageTitleCollection];
    }

    return columnsTitleCollection.map((columnTitle, idx) => {
      // if true - return required and visible column =)
      return columnTitle === "name_rus" ||
        columnTitle === "territory_name_rus" ? (
        <Column
          dataField={columnTitle}
          caption={formatMessage(columnTitle)}
          minWidth={250}
          key={idx}
        >
          <RequiredRule />
        </Column>
      ) : (
        <Column
          dataField={columnTitle}
          caption={formatMessage(columnTitle)}
          visible={false}
          key={idx}
        />
      );
    });
  }

  function customCodeMarkupRender() {
    let murkupCollection = [];

    if (pathnameToName === "kopf") {
      const pageTitleCollection = [
        {
          dataField: "code",
          width: 120,
          message: "code_err_message_3",
          pattern: "^[0-9]{3}$",
          required: true,
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToName === "soato") {
      const pageTitleCollection = [
        {
          dataField: "code",
          width: 120,
          message: "code_err_numeric_message",
          pattern: "^[0-9]*$",
          required: true,
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToName === "kspd") {
      const pageTitleCollection = [
        {
          dataField: "code",
          width: 120,
          message: "code_err_message_2",
          pattern: "^[0-9]{1,2}$",
          required: true,
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToName === "kfs") {
      const pageTitleCollection = [
        {
          dataField: "KFSCode",
          width: 100,
          message: "code_err_message_3",
          pattern: "^[0-9]{3}$",
          required: true,
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToName === "oked") {
      const pageTitleCollection = [
        {
          dataField: "code",
          width: 120,
          message: "code_err_message_5",
          pattern: "^[0-9]{0,5}$",
          required: false,
        },
      ];

      murkupCollection = [...pageTitleCollection];
    }

    return murkupCollection.map((item, idx) => {
      const {dataField, width, message, pattern, required} = item;

      return (
        <Column
          key={idx}
          dataField={dataField}
          caption={formatMessage(
            `${pathnameToName}_code`,
            localizedPageShortName
          )}
          alignment="left"
          width={width}
          visible={true}
        >
          <PatternRule
            message={formatMessage(message, localizedPageShortName)}
            pattern={new RegExp(pattern)}
          />
          {required && <RequiredRule />}
        </Column>
      );
    });
  }

  // function onEditorPreparing(e) {
  //   console.log(`onEditorPreparing(e) =>`, e);
  //   // if (e.parentType === "dataRow" && e.dataField === "CityID") {
  //   //   e.editorOptions.disabled = typeof e.row.data.StateID !== "number";
  //   // }
  // }

  const onFocusedCellChanging = (e) => {
    console.log(`onFocusedCellChanging(e.newRowIndex) => `, e.newRowIndex);
    console.log(`onFocusedCellChanging(e) => `, e);
    // e.isHighlighted = true;
  };

  return (
    <div className="page-wrapper">
      <h2 className={"content-block"}>
        {formatMessage(`${pathnameToName}_title`, localizedPageShortName)}
      </h2>

      <Button
        className="btn"
        icon="hierarchy"
        stylingMode="outlined"
        text={formatMessage(stateOfRows)}
        onClick={clickHandler}
      />

      <TreeList
        dataSource={APIData}
        rootValue={0}
        keyExpr="id"
        parentIdExpr="pid"
        // defaultExpandedRowKeys={[1, 3, 5]}
        // rows
        showRowLines={true}
        focusedRowEnabled={true}
        rowAlternationEnabled={false}
        // columns
        showColumnLines={true}
        columnMinWidth={60}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        // appearance
        hoverStateEnabled={true}
        wordWrapEnabled={true}
        virtualModeEnabled={true}
        // functions
        autoExpandAll={toggler}
        onInitNewRow={initNewRow}
        // onEditorPreparing={onEditorPreparing}
        onFocusedCellChanging={onFocusedCellChanging}
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} allowSearch={true} />
        <ColumnChooser
          enabled={true}
          allowSearch={true}
          width={300}
          height={365}
          title={formatMessage("colomn_chooser")}
          emptyPanelText={formatMessage("colomn_chooser_empty_text")}
        />
        <FilterRow visible={true} />

        <Editing
          mode="popup"
          popup={popupOpt}
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
        />

        <Column
          dataField="id"
          caption="ID"
          alignment="center"
          visible={false}
          allowEditing={false}
          disabled={true}
          width={80}
        />

        {customMarkupRender()}
        {customCodeMarkupRender()}

        <Column
          dataField="pid"
          caption={formatMessage("as_child_of")}
          visible={false}
        >
          <Lookup
            dataSource={lookDataState}
            valueExpr="id"
            displayExpr="name"
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
          <TreeListButton
            name="add"
            hint={formatMessage("add_new_item", localizedPageShortName)}
          />
          <TreeListButton
            name="edit"
            hint={formatMessage("edit_new_item", localizedPageShortName)}
          />
          <TreeListButton
            name="delete"
            hint={formatMessage("delete_new_item", localizedPageShortName)}
          />
        </Column>

        <Paging defaultPageSize={10} enabled={true} />
        <Pager
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
          allowedPageSizes={[10, 20, 50, 100, "all"]}
          showAllItem={true}
          visible={true}
        />
      </TreeList>
    </div>
  );
};
