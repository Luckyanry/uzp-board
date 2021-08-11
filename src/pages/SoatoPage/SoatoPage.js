import React from "react";

import TreeList, {
  RemoteOperations,
  Column,
  SearchPanel,
  HeaderFilter,
  Editing,
  RequiredRule,
  Lookup,
} from "devextreme-react/tree-list";

import {soatoData, soatoLookData} from "../../api/soato-fetch";

import "./SoatoPage.scss";

export const SoatoPage = () => {
  return (
    <TreeList
      id="tree-list"
      dataSource={soatoData}
      rootValue={0}
      keyExpr="id"
      parentIdExpr="pid"
      // hasItemsExpr="Has_Items"
      defaultExpandedRowKeys={[1, 2]}
      showRowLines={true}
      showBorders={true}
      columnAutoWidth={true}
      wordWrapEnabled={true}
      // onInitNewRow={initNewRow}
    >
      <RemoteOperations filtering={true} sorting={true} grouping={true} />
      <SearchPanel visible={true} />
      <HeaderFilter visible={true} />
      <Editing
        mode="row"
        allowAdding={true}
        allowUpdating={true}
        allowDeleting={true}
      />
      <Column dataField="territory_name_rus" minWidth={250}>
        <RequiredRule />
      </Column>
      <Column dataField="code" />
      {/* <Column
        dataField="pid"
        // caption="Assigned"
        // minWidth={120}
      > */}
      {/* <Lookup dataSource={employeesData} valueExpr="ID" displayExpr="Name" /> */}
      {/* <Lookup dataSource={soatoLookData} valueExpr="pid" displayExpr="name" /> */}
      {/* <RequiredRule />
      </Column> */}
    </TreeList>
  );
};
