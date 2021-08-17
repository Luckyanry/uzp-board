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
  Button as TreeListButton,
} from "devextreme-react/tree-list";
import Button from "devextreme-react/button";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./KfsPage.scss";

export const KfsPage = ({location: {pathname}}) => {
  const [toggler, setToggler] = useState(false);
  const [lookDataState, setLookDataState] = useState(null);

  const {formatMessage} = useLocalization();
  const pageShortName = formatMessage("kfs");

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

  function clickHandler() {
    setToggler((toggler) => !toggler);

    if (toggler) {
      window.location.reload();
    }
  }

  useEffect(() => {
    lookData
      ._loadFunc()
      .then((res) => res.data)
      .then((arr) => setLookDataState(arr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-wrapper">
      <h2 className={"content-block"}>{formatMessage("kfs_title")}</h2>

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
        defaultExpandedRowKeys={[0, 1]}
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
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} allowSearch={true} />
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
          width={80}
        />

        <Column
          dataField="name_rus"
          caption={formatMessage("name_rus")}
          minWidth={250}
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
          dataField="pid"
          caption={formatMessage("as_child_of")}
          visible={false}
        >
          <Lookup
            dataSource={lookDataState}
            displayExpr="name"
            valueExpr="id"
          />
        </Column>

        <Column
          dataField="KFSCode"
          caption={formatMessage("kfs_code", pageShortName)}
          alignment="left"
          width={100}
        >
          <PatternRule
            message={formatMessage("code_err_message", pageShortName)}
            pattern={new RegExp("^[0-9]{3}$", "m")}
          />
          <RequiredRule />
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
