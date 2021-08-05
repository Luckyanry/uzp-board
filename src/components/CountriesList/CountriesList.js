import React from "react";

import "devextreme/data/odata/store";
import DataGrid, {Column, Paging, Pager} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

// const url = "http://10.0.10.71/actions.asp";

const store = new CustomStore({
  key: "OrderNumber",
  load: function (loadOptions) {
    let params = "?";
    [
      "skip",
      "take",
      "requireTotalCount",
      "requireGroupCount",
      "sort",
      "filter",
      "totalSummary",
      "group",
      "groupSummary",
    ].forEach(function (i) {
      if (i in loadOptions && isNotEmpty(loadOptions[i])) {
        params += `${i}=${JSON.stringify(loadOptions[i])}&`;
      }
    });
    params = params.slice(0, -1);
    return fetch(
      `https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        console.log(response.json());
        throw new Error("Error fetching data");
      })
      .then(({data, totalCount, summary, groupCount}) => {
        return {
          data,
          totalCount,
          summary,
          groupCount,
        };
      })
      .catch((err) => {
        throw new Error("Data Loading Error", err);
      });
  },
});

class CountriesList extends React.Component {
  render() {
    return (
      <DataGrid dataSource={store} showBorders={true} remoteOperations={true}>
        <Column dataField="OrderNumber" dataType="number" />
        <Column dataField="OrderDate" dataType="date" />
        <Column dataField="StoreCity" dataType="string" />
        <Column dataField="StoreState" dataType="string" />
        <Column dataField="Employee" dataType="string" />
        <Column dataField="SaleAmount" dataType="number" format="currency" />
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 50]} />
      </DataGrid>
    );
  }
}

export default CountriesList;
