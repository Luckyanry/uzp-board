import React from "react";

import TreeList, {
  Column,
  SearchPanel,
  HeaderFilter,
  Editing,
  RequiredRule,
  Paging,
  Pager,
} from "devextreme-react/tree-list";

import {soatoData} from "../../api/soato-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";

import "./SoatoPage.scss";

export const SoatoPage = () => {
  const {formatMessage} = useLocalization();

  return (
    <TreeList
      // id="tree-list"
      dataSource={soatoData}
      rootValue={0}
      keyExpr="id"
      parentIdExpr="pid"
      defaultExpandedRowKeys={[1, 2]}
      showRowLines={true}
      // showBorders={true}
      columnAutoWidth={true}
      wordWrapEnabled={true}
    >
      <SearchPanel visible={true} />
      <HeaderFilter visible={true} />

      <Editing
        mode="row"
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

      <Column dataField="code" caption={formatMessage("code")} />

      <Paging defaultPageSize={10} enabled={true} />
      <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 50]} />
    </TreeList>
  );
};
