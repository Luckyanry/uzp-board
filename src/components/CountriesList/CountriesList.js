import React from "react";

import "devextreme/data/odata/store";
import DataGrid, {Column, Paging, Pager} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

const baseUrl = "http://10.0.10.71/actions.asp";

const store = new CustomStore({
  key: "guid",
  load: function () {
    let data = new URLSearchParams();
    data.append("operation", "load");
    data.append("db", "hbdb");
    data.append("schema", "get");
    data.append("sp", "Countries");

    let options = {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    };

    return fetch(`${baseUrl}`, options)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Error fetching data");
      })
      .then((data) => {
        return {
          data,
          totalCount: data.length,
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
      <DataGrid dataSource={store} showBorders={true}>
        <Column dataField="short_name" dataType="string" />
        <Column dataField="numeric" dataType="string" />
        <Column dataField="alpha2code" dataType="string" />
        <Column dataField="alpha3code" dataType="string" />
        <Column dataField="short_name_eng" dataType="string" />
        <Column dataField="short_name_karlat" dataType="string" />
        <Column dataField="short_name_rus" dataType="string" />
        <Column dataField="short_name_uzcyr" dataType="string" />
        <Column dataField="short_name_uzlat" dataType="string" />
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 50]} />
      </DataGrid>
    );
  }
}

export default CountriesList;
