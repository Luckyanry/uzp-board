import React from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  FilterRow,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

const url = "http://10.0.10.71";
const baseParams = "/actions.asp?sp=Countries&db=hbdb";

const store = new CustomStore({
  key: "id",
  load: () =>
    sendRequest(`${url}${baseParams}`, {
      operation: "load",
      schema: "get",
    }),
  insert: (values) =>
    sendRequest(
      `${url}${baseParams}`,
      {
        operation: "insert",
        schema: "ins",
        values: JSON.stringify(values),
      },
      "POST"
    ),
  update: (key, values) =>
    sendRequest(
      `${url}${baseParams}`,
      {
        operation: "update",
        schema: "upd",
        "@id": key,
        values: JSON.stringify(values),
      },
      "POST"
    ),
  remove: (key) =>
    sendRequest(
      `${url}${baseParams}`,
      {
        operation: "insert",
        schema: "del",
        "@id": key,
      },
      "POST"
    ),
});

function sendRequest(url, data = {}, method = "GET") {
  const params = Object.keys(data)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
    })
    .join("&");

  if (method === "GET") {
    return fetch(`${url}&${params}`, {
      method,
      credentials: "include",
      xhrFields: {withCredentials: true},
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("GET Request Data");
      })
      .then((data) => {
        if (Array.isArray(data)) {
          return {
            data,
            totalCount: data.length,
          };
        } else {
          throw new Error(
            `
              ScriptFile: ${data.ScriptFile},
              Description: ${data.VBErr.Description}, 
              Error Number: ${data.VBErr.Number}, 
              Source: ${data.VBErr.Source}, 
              Hint: ${data.hint}
            `
          );
        }
      })
      .catch((err) => {
        console.error("GET Response Data", err);
        throw new Error(err);
      });
  }

  return fetch(url, {
    method,
    body: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    credentials: "include",
    xhrFields: {withCredentials: true},
  })
    .then((response) => {
      if (response.ok) return response.text();
    })
    .then((text) => {
      let json = JSON.parse(text);

      if (!json.hint) {
        console.log("Success =>", json);
        return text && JSON.parse(text);
      } else {
        console.log("Error =>", json);
        throw new Error(
          `
            ScriptFile: ${json.ScriptFile},
            Description: ${json.VBErr.Description}, 
            Error Number: ${json.VBErr.Number}, 
            Source: ${json.VBErr.Source}, 
            Hint: ${json.hint}
          `
        );
      }
    })
    .catch((err) => {
      console.error("POST Response Data", err);
      throw new Error(err);
    });
}
class CountriesList extends React.Component {
  render() {
    return (
      <DataGrid
        dataSource={store}
        showBorders={true}
        repaintChangesOnly={true}
        remoteOperations={false}
      >
        <FilterRow visible={true} />

        <Editing
          mode="row"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />

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

// .then((response) => {
//   if (response.ok) {
//     if (Array.isArray(data)) {
//       return response
//         .text()
//         .then((text) => text && JSON.parse(text))
//         .catch((err) => {
//           throw new Error(err);
//         });
//     } else {
//       return response
//         .json()
//         .then((json) => {
//           throw new Error(
//             `
//               ScriptFile: ${json.ScriptFile},
//               Description: ${json.VBErr.Description},
//               Error Number: ${json.VBErr.Number},
//               Source: ${json.VBErr.Source},
//               Hint: ${json.hint}
//               `
//           );
//         })
//         .catch((err) => {
//           throw new Error(err);
//         });
//     }
//   }
// })
