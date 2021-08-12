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
} from "devextreme-react/tree-list";
import Button from "devextreme-react/button";

import {soatoData} from "../../api/soato-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./SoatoPage.scss";

export const SoatoPage = () => {
  const [toggler, setToggler] = useState(false);

  const {formatMessage} = useLocalization();

  function clickHandler() {
    setToggler((toggler) => !toggler);

    if (toggler) {
      window.location.reload();
    }
  }

  return (
    <div className="soato-page-wrapper">
      <h2 className={"content-block"}>{formatMessage("soato")}</h2>

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
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} allowSearch={true} />
        <FilterRow visible={true} />

        <Paging defaultPageSize={15} enabled={true} />
        <Pager
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
          allowedPageSizes={[15, 30, 100]}
          visible={true}
        />

        <Editing
          mode="form"
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

        <Column dataField="code" caption={formatMessage("code")}>
          <RequiredRule />
        </Column>
      </TreeList>
    </div>
  );
};
