import React from "react";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  FilterRow,
  RequiredRule,
  PatternRule,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

import "./CountriesPage.scss";

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
        return text && JSON.parse(text);
      } else {
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

export const CountriesPage = () => (
  <>
    <h2 className={"content-block"}>Countries</h2>

    <DataGrid
      dataSource={store}
      showBorders={true}
      repaintChangesOnly={true}
      remoteOperations={false}
      focusedRowEnabled={true}
      // defaultFocusedRowIndex={0}
      columnAutoWidth={true}
      columnHidingEnabled={true}
    >
      <FilterRow visible={true} />

      <Editing
        mode="row"
        allowAdding={true}
        allowDeleting={true}
        allowUpdating={true}
      />

      <Column dataField="short_name" dataType="string">
        <RequiredRule />
      </Column>

      <Column dataField="numeric" dataType="string">
        <PatternRule
          message={"The 'Numeric' field must contain a maximum of 5 digits!"}
          pattern={/^[0-9]{1,5}$/g}
        />
      </Column>

      <Column dataField="alpha2code" dataType="string">
        <PatternRule
          message={
            "The 'Alpha 2code' field must contain a maximum of 2 characters in uppercase!"
          }
          pattern={/^[A-Z]{2}$/g}
        />
      </Column>

      <Column dataField="alpha3code" dataType="string">
        <PatternRule
          message={
            "The 'Alpha 3code' field must contain a maximum of 3 characters in uppercase!"
          }
          pattern={/^[A-Z]{3}$/g}
        />
      </Column>

      <Column dataField="short_name_eng" dataType="string" />
      <Column dataField="short_name_karlat" dataType="string" />
      <Column dataField="short_name_rus" dataType="string" />
      <Column dataField="short_name_uzcyr" dataType="string" />
      <Column dataField="short_name_uzlat" dataType="string" />

      <Paging defaultPageSize={10} />
      <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 50]} />
    </DataGrid>
  </>
);
