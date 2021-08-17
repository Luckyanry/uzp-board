import React, {useEffect, useState} from "react";

import TreeList, {
  Column,
  SearchPanel,
  HeaderFilter,
  Editing,
  RequiredRule,
  PatternRule,
  Paging,
  Pager,
  Scrolling,
  FilterRow,
  Lookup,
  ColumnChooser,
  Button as TreeListButton,
} from "devextreme-react/tree-list";
import Button from "devextreme-react/button";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./KopfPage.scss";

export const KopfPage = ({location: {pathname}}) => {
  const [toggler, setToggler] = useState(false);
  const [lookDataState, setLookDataState] = useState(null);

  const {formatMessage} = useLocalization();
  const pathnameToName = pathname.split("/")[1];
  const pageShortName = formatMessage(pathnameToName);

  console.log(`pathnameToName`, pathnameToName);
  console.log(`pageShortName`, pageShortName);

  const fetchData = FetchData(pathname).fetchData;
  const lookData = FetchData(pathname).lookData;

  const defaultStatus = ["Active", "Deactivated"];
  const statusesLang = defaultStatus.map((statusLang) => {
    const statusLanguage = formatMessage(statusLang);
    return statusLanguage;
  });

  const popupOpt = {
    title: formatMessage("create_new_item", pageShortName),
    showTitle: true,
    width: 950,
    height: 780,
  };

  useEffect(() => {
    lookData
      ._loadFunc()
      .then((res) => res.data)
      .then((arr) => setLookDataState(arr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initNewRow(e) {
    e.data.status = statusesLang[0];
    // e.data.created_date = new Date();
    // e.data.changed_date = new Date();
  }

  function clickHandler() {
    setToggler((toggler) => !toggler);

    if (toggler) {
      window.location.reload();
    }
  }

  function customMarkupRender() {
    let columnsTitleCollection = [];

    if (pathnameToName === "kopf") {
      const pageTitleCollection = [
        "name_rus",
        "name_uzcyr",
        "name_uzlat",
        "name_karlat",
        "name_eng",
      ];
      columnsTitleCollection = [...pageTitleCollection];
    }

    return columnsTitleCollection.map((columnTitle, idx) => {
      return columnTitle === "name_rus" ? (
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

  return (
    <div className="page-wrapper">
      <h2 className={"content-block"}>
        {formatMessage(`${pathnameToName}_title`)}
      </h2>

      <Button
        className="btn"
        icon="hierarchy"
        stylingMode="outlined"
        text={formatMessage("expand")}
        onClick={clickHandler}
      />

      <TreeList
        dataSource={fetchData}
        rootValue={0}
        keyExpr="id"
        parentIdExpr="pid"
        // defaultExpandedRowKeys={[1, 2]}
        showRowLines={true}
        columnAutoWidth={true}
        wordWrapEnabled={true}
        autoExpandAll={toggler}
        focusedRowEnabled={true}
        showColumnLines={true}
        allowColumnResizing={true}
        columnHidingEnabled={true}
        rowAlternationEnabled={false}
        hoverStateEnabled={true}
        onInitNewRow={initNewRow}
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} allowSearch={true} />
        <FilterRow visible={true} />
        <ColumnChooser enabled={true} />

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
          width={80}
        />

        {customMarkupRender()}

        {pathnameToName === "kopf" && (
          <Column
            dataField="code"
            caption={formatMessage("kopf_code", pageShortName)}
            alignment="left"
            width={120}
          >
            <PatternRule
              message={formatMessage("code_err_message", pageShortName)}
              pattern={new RegExp("^[0-9]{3}$", "m")}
            />
            <RequiredRule />
          </Column>
        )}

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
            hint={formatMessage("add_new_item", pageShortName)}
          />
          <TreeListButton
            name="edit"
            hint={formatMessage("edit_new_item", pageShortName)}
          />
          <TreeListButton
            name="delete"
            hint={formatMessage("delete_new_item", pageShortName)}
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
