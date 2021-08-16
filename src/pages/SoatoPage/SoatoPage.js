import React, {useEffect, useState} from "react";

import TreeList, {
  Column,
  SearchPanel,
  HeaderFilter,
  Editing,
  RequiredRule,
  Paging,
  Pager,
  Scrolling,
  FilterRow,
  Lookup,
  // Button as TreeListButton,
} from "devextreme-react/tree-list";
// import {Lookup, DropDownOptions} from "devextreme-react/lookup";
import Button from "devextreme-react/button";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./SoatoPage.scss";

export const SoatoPage = ({location: {pathname}}) => {
  const [toggler, setToggler] = useState(false);
  const [lookDataState, setLookDataState] = useState(null);
  // const [dataState, setDataState] = useState([]);

  const {formatMessage, locale} = useLocalization();

  locale();
  // console.log("localization", locale(navigator.language));

  const fetchData = FetchData(pathname).fetchData;
  const lookData = FetchData(pathname).lookData;

  const defaultStatus = ["Active", "Deactivated"];
  const statusesLang = defaultStatus.map((statusLang) => {
    const statusLanguage = formatMessage(statusLang);
    return statusLanguage;
  });

  const popupOpt = {
    title: formatMessage("new_row"),
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

  console.log(`lookDataState => `, lookDataState);
  console.log(`fetchData => `, fetchData);
  console.log(`lookData => `, lookData);

  return (
    <div className="page-wrapper">
      <h2 className={"content-block"}>{formatMessage("soato_title")}</h2>

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
        allowColumnResizing={true}
        columnHidingEnabled={true}
        rowAlternationEnabled={false}
        hoverStateEnabled={true}
        virtualModeEnabled={true}
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

        {/* <Column dataField="id" caption="ID" autoExpandAll={true} /> */}

        <Column
          dataField="territory_name_rus"
          caption={formatMessage("territory_name_rus")}
          minWidth={250}
        >
          <RequiredRule />
        </Column>

        <Column
          dataField="territory_name_uzcyr"
          caption={formatMessage("territory_name_uzcyr")}
          visible={false}
        />
        <Column
          dataField="territory_name_uzlat"
          caption={formatMessage("territory_name_uzlat")}
          visible={false}
        />
        <Column
          dataField="territory_name_karlat"
          caption={formatMessage("territory_name_karlat")}
          visible={false}
        />
        <Column
          dataField="territory_name_eng"
          caption={formatMessage("territory_name_eng")}
          visible={false}
        />

        <Column
          dataField="admin_centre_rus"
          caption={formatMessage("admin_centre_rus")}
          visible={false}
        />
        <Column
          dataField="admin_centre_uzcyr"
          caption={formatMessage("admin_centre_uzcyr")}
          visible={false}
        />
        <Column
          dataField="admin_centre_uzlat"
          caption={formatMessage("admin_centre_uzlat")}
          visible={false}
        />
        <Column
          dataField="admin_centre_karlat"
          caption={formatMessage("admin_centre_karlat")}
          visible={false}
        />
        <Column
          dataField="admin_centre_eng"
          caption={formatMessage("admin_centre_eng")}
          visible={false}
        />

        <Column
          dataField="pid"
          caption={formatMessage("as_child_of")}
          visible={false}
          virtualModeEnabled={true}
        >
          <Lookup
            dataSource={lookDataState}
            valueExpr="pid"
            displayExpr="name"
            virtualModeEnabled={true}
          />
        </Column>

        <Column dataField="code" caption={formatMessage("soato_code")}>
          <RequiredRule />
        </Column>

        <Column dataField="status" caption={formatMessage("status")}>
          <Lookup dataSource={statusesLang} />
          <RequiredRule />
        </Column>

        {/* <Column type="buttons" width={110}>
          <TreeListButton name="add" hint={formatMessage("add")} />
          <TreeListButton name="edit" hint={formatMessage("edit")} />
          <TreeListButton name="delete" hint={formatMessage("delete")} />
        </Column> */}

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
