import React, {useState} from "react";

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
} from "devextreme-react/tree-list";
import Button from "devextreme-react/button";

// import {soatoData} from "../../api/soato-fetch";
import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./SoatoPage.scss";

export const SoatoPage = () => {
  const [toggler, setToggler] = useState(false);

  const {formatMessage} = useLocalization();
  const soatoData = FetchData(window.location.hash);

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

  return (
    <div className="soato-page-wrapper">
      <h2 className={"content-block"}>{formatMessage("soato_title")}</h2>

      <Button
        className="btn"
        icon="hierarchy"
        stylingMode="outlined"
        text={formatMessage("expand")}
        onClick={clickHandler}
      />

      <TreeList
        dataSource={soatoData}
        rootValue={0}
        keyExpr="id"
        parentIdExpr="pid"
        defaultExpandedRowKeys={[1, 2]}
        showRowLines={true}
        columnAutoWidth={true}
        wordWrapEnabled={true}
        autoExpandAll={toggler}
        focusedRowEnabled={true}
        allowColumnResizing={true}
        columnHidingEnabled={true}
        rowAlternationEnabled={true}
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
          dataField="territory_name_rus"
          caption={formatMessage("territory_name_rus")}
          minWidth={250}
        >
          <RequiredRule />
        </Column>

        <Column
          dataField="pid"
          caption={formatMessage("as_child_of")}
          visible={false}
        />

        <Column dataField="code" caption={formatMessage("code")}>
          <RequiredRule />
        </Column>

        <Column dataField="status" caption={formatMessage("status")}>
          <Lookup dataSource={statusesLang} />
          <RequiredRule />
        </Column>

        <Column
          dataField="territory_name_eng"
          caption={formatMessage("territory_name_eng")}
          visible={false}
        />
        <Column
          dataField="territory_name_uzlat"
          caption={formatMessage("territory_name_uzlat")}
          visible={false}
        />
        <Column
          dataField="territory_name_uzcyr"
          caption={formatMessage("territory_name_uzcyr")}
          visible={false}
        />
        <Column
          dataField="territory_name_karlat"
          caption={formatMessage("territory_name_karlat")}
          visible={false}
        />
        <Column
          dataField="admin_centre_rus"
          caption={formatMessage("admin_centre_rus")}
          visible={false}
        />
        <Column
          dataField="admin_centre_eng"
          caption={formatMessage("admin_centre_eng")}
          visible={false}
        />
        <Column
          dataField="admin_centre_uzlat"
          caption={formatMessage("admin_centre_uzlat")}
          visible={false}
        />
        <Column
          dataField="admin_centre_uzcyr"
          caption={formatMessage("admin_centre_uzcyr")}
          visible={false}
        />
        <Column
          dataField="admin_centre_karlat"
          caption={formatMessage("admin_centre_karlat")}
          visible={false}
        />

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
