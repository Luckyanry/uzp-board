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
  FormItem,
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
  const [lookDataState, setLookDataState] = useState([]);
  const [stateOfRows, setStateOfRows] = useState("msgExpandAllRows");
  // const [expandedRowKeys, setExpandedRowKeys] = useState([1, 3, 5]);

  const {formatMessage} = useLocalization();
  const fetchData = FetchData(pathname, formatMessage).fetchData;
  // const lookData = FetchData(pathname, formatMessage).lookupDataSource;
  const lookData = FetchData(pathname, formatMessage).lookData;

  const pathnameToNameWithoutSlash = pathname.split("/")[1];
  const localPathname = createCustomMsg(pathnameToNameWithoutSlash);
  const localPageAbbreviation = formatMessage(
    customPageAbbreviationMsg(pathnameToNameWithoutSlash)
  );

  const popupOpt = {
    title: formatMessage("msgCreateNewItem", localPageAbbreviation),
    showTitle: true,
    width: 950,
    height: 780,
  };

  useEffect(() => {
    setAPIData(fetchData);

    const getLookDataState = async () => {
      // console.log(`lookData => `, lookData);
      // const result = await lookData.store._loadFunc().then((res) => res.data);
      const result = await lookData._loadFunc().then((res) => res.data);

      setLookDataState(result);
    };

    getLookDataState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function clickHandler() {
    setToggler((toggler) => !toggler);
    setStateOfRows(() =>
      stateOfRows === "msgMinimisedAllRows"
        ? "msgExpandAllRows"
        : "msgMinimisedAllRows"
    );

    if (toggler) {
      window.location.reload();
    }
  }

  function createCustomMsg(message) {
    const changeFirstLetterToUpper = `${message[0].toUpperCase()}${message.slice(
      1
    )}`;
    return `msg${changeFirstLetterToUpper}`;
  }

  function customPageAbbreviationMsg(message) {
    return `msg${message[0].toUpperCase()}${message.slice(1)}Abbreviation`;
  }

  function customMarkupRender() {
    let columnsTitleCollection = [];

    if (
      pathnameToNameWithoutSlash === "kopf" ||
      pathnameToNameWithoutSlash === "kspd" ||
      pathnameToNameWithoutSlash === "kfs" ||
      pathnameToNameWithoutSlash === "oked"
    ) {
      const pageTitleCollection = [
        {
          value: "id",
          caption: "msgId",
          visible: false,
          disabled: true,
          required: false,
          allowEditing: false,
          formItem: true,
          width: 80,
          alignment: "center",
        },
        {value: "name_rus", caption: "msgNameRus", visible: true},
        {value: "name_uzcyr", caption: "msgNameUzcyr"},
        {value: "name_uzlat", caption: "msgNameUzlat"},
        {value: "name_karlat", caption: "msgNameKarlat"},
        {value: "name_eng", caption: "msgNameEng"},
        {value: "pid", caption: "msgAsChildOf", visible: false, lookup: true},
      ];

      columnsTitleCollection = [...pageTitleCollection];
    } else if (pathnameToNameWithoutSlash === "soato") {
      const pageTitleCollection = [
        {
          value: "id",
          caption: "msgId",
          visible: false,
          disabled: true,
          required: false,
          allowEditing: false,
          formItem: true,
          width: 80,
          alignment: "center",
        },
        {
          value: "territory_name_rus",
          caption: "msgTerritoryNameRus",
          visible: true,
        },
        {value: "territory_name_uzcyr", caption: "msgTerritoryNameUzcyr"},
        {value: "territory_name_uzlat", caption: "msgTerritoryNameUzlat"},
        {value: "territory_name_karlat", caption: "msgTerritoryNameKarlat"},
        {value: "territory_name_eng", caption: "msgTerritoryNameEng"},
        {value: "admin_centre_rus", caption: "msgAdminCentreRus"},
        {value: "admin_centre_uzcyr", caption: "msgAdminCentreUzcyr"},
        {value: "admin_centre_uzlat", caption: "msgAdminCentreUzlat"},
        {value: "admin_centre_karlat", caption: "msgAdminCentreKarlat"},
        {value: "admin_centre_eng", caption: "msgAdminCentreEng"},
        {value: "pid", caption: "msgAsChildOf", visible: false, lookup: true},
      ];

      columnsTitleCollection = [...pageTitleCollection];
    }

    return columnsTitleCollection.map((item, idx) => {
      const {
        value,
        caption = value,
        visible = false,
        disabled = false,
        required = false,
        width = "100%",
        minWidth = 250,
        alignment = "left",
        formItem = false,
        lookup = false,
        allowEditing = true,
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
          minWidth={minWidth}
          allowEditing={allowEditing}
        >
          {required && <RequiredRule />}
          {formItem && <FormItem visible={false} />}
          {lookup && (
            <Lookup
              dataSource={lookDataState}
              valueExpr="id"
              displayExpr="name"
            />
          )}
        </Column>
      );
    });
  }

  function customCodeMarkupRender() {
    let murkupCollection = [];

    if (pathnameToNameWithoutSlash === "kopf") {
      const pageTitleCollection = [
        {
          dataField: "code",
          width: 120,
          message: "msgCodeErrThreeDigitsMsg",
          pattern: "^[0-9]{3}$",
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToNameWithoutSlash === "soato") {
      const pageTitleCollection = [
        {
          dataField: "code",
          width: 120,
          message: "msgCodeErrNumericMsg",
          pattern: "^[0-9]*$",
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToNameWithoutSlash === "kspd") {
      const pageTitleCollection = [
        {
          dataField: "code",
          width: 120,
          message: "msgCodeErrTwoDigitsMsg",
          pattern: "^[0-9]{1,2}$",
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToNameWithoutSlash === "kfs") {
      const pageTitleCollection = [
        {
          dataField: "KFSCode",
          width: 100,
          message: "msgCodeErrThreeDigitsMsg",
          pattern: "^[0-9]{3}$",
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToNameWithoutSlash === "oked") {
      const pageTitleCollection = [
        {
          dataField: "code",
          width: 120,
          message: "msgCodeErrFiveDigitsMsg",
          pattern: "^[0-9]{0,5}$",
          required: false,
        },
      ];

      murkupCollection = [...pageTitleCollection];
    }

    return murkupCollection.map((item, idx) => {
      const {
        dataField,
        width,
        message,
        pattern,
        required = true,
        alignment = "left",
      } = item;

      return (
        <Column
          key={idx}
          dataField={dataField}
          caption={formatMessage(`${localPathname}Code`, localPageAbbreviation)}
          alignment={alignment}
          width={width}
          visible={true}
        >
          <PatternRule
            message={formatMessage(message, localPageAbbreviation)}
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

  // const onFocusedCellChanging = (e) => {
  //   console.log(`onFocusedCellChanging(e.newRowIndex) => `, e.newRowIndex);
  //   console.log(`onFocusedCellChanging(e) => `, e);
  //   // e.isHighlighted = true;
  // };

  return (
    <div className="page-wrapper">
      <h2 className={"content-block"}>
        {formatMessage(`${localPathname}HeaderTitle`, localPageAbbreviation)}
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
        columnHidingEnabled={false}
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
        // onFocusedCellChanging={onFocusedCellChanging}
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} allowSearch={true} />
        <ColumnChooser
          enabled={true}
          allowSearch={true}
          width={300}
          height={365}
          title={formatMessage("msgColomnChooser")}
          emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
        />
        <FilterRow visible={true} />

        <Editing
          mode="popup"
          popup={popupOpt}
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
        />

        {customMarkupRender()}
        {customCodeMarkupRender()}

        <Column
          dataField="status"
          caption={formatMessage("msgStatus")}
          alignment="center"
          width={120}
        >
          <Lookup dataSource={statusesLang()} />
          <RequiredRule />
        </Column>

        <Column type="buttons" width={110}>
          <TreeListButton
            name="add"
            hint={formatMessage("msgAddNewItem", localPageAbbreviation)}
          />
          <TreeListButton
            name="edit"
            hint={formatMessage("msgEditNewItem", localPageAbbreviation)}
          />
          <TreeListButton
            name="delete"
            hint={formatMessage("msgDeleteNewItem", localPageAbbreviation)}
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
