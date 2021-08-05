import React from "react";

import "devextreme/data/odata/store";
import {
  Column,
  DataGrid,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  Scrolling,
  Editing,
  Grouping,
  Summary,
  RequiredRule,
  StringLengthRule,
  GroupItem,
  TotalItem,
  ValueFormat,
} from "devextreme-react/data-grid";

import {createStore} from "devextreme-aspnet-data-nojquery";
// import MasterDetailGrid from './MasterDetailGrid.js';

// import classes from "./Countries.module.css";

const url = "https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi";

const dataSource = createStore({
  key: "OrderID",
  loadUrl: `${url}/Orders`,
  insertUrl: `${url}/InsertOrder`,
  updateUrl: `${url}/UpdateOrder`,
  deleteUrl: `${url}/DeleteOrder`,
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.xhrFields = {withCredentials: true};
  },
});

class Countries extends React.Component {
  render() {
    return (
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        height={600}
        remoteOperations={true}
      >
        {/* <MasterDetail
          enabled={true}
          component={MasterDetailGrid}
        /> */}
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <GroupPanel visible={true} />
        <Scrolling mode="virtual" />
        <Editing
          mode="row"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />
        <Grouping autoExpandAll={false} />

        <Column dataField="OrderDate" dataType="date">
          <RequiredRule message="The OrderDate field is required." />
        </Column>

        <Column dataField="ShipCountry">
          <StringLengthRule
            max={15}
            message="The field ShipCountry must be a string with a maximum length of 15."
          />
        </Column>

        <Summary>
          <TotalItem column="Freight" summaryType="sum">
            <ValueFormat type="decimal" precision={2} />
          </TotalItem>

          <GroupItem column="Freight" summaryType="sum">
            <ValueFormat type="decimal" precision={2} />
          </GroupItem>

          <GroupItem summaryType="count" />
        </Summary>
      </DataGrid>
    );
  }
}

export default Countries;
