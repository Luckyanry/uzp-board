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
import "whatwg-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";
import {countriesStore} from "../../api/countries-fetch";

import "./CountriesPage.scss";

const colmnsTitlesArr = [
  "short_name_eng",
  "short_name_karlat",
  "short_name_rus",
  "short_name_uzcyr",
  "short_name_uzlat",
];

export const CountriesPage = () => {
  const {formatMessage} = useLocalization();

  // const customizeText = (columnValue) => {
  //   if (/^ *$/.test(columnValue.value) && columnValue.value.length > 0) {
  //     console.log("empty string", columnValue);

  //     const emptyString = {
  //       ...columnValue,
  //       value: null,
  //     };

  //     console.log("new", emptyString.value);

  //     return emptyString.value;
  //   }

  //   console.log(`value:`, columnValue);
  //   return columnValue.value;
  // };

  const columnsMarkup = colmnsTitlesArr
    .map((columnTitle) => {
      return `
    <Column
      dataField={${columnTitle}}
      caption={${formatMessage(columnTitle)}}
      alignment="left"
      ${
        columnTitle === "numeric" ||
        columnTitle === "alpha2code" ||
        columnTitle === "alpha3code"
          ? `width={100}`
          : null
      }
    >
      ${
        columnTitle === "numeric"
          ? `<PatternRule
              message={${formatMessage("numeric_err_message")}}
              pattern={new RegExp("^[0-9]{0,4}$")}
            />`
          : null
      }
      ${
        columnTitle === "alpha2code"
          ? `<PatternRule
              message={${formatMessage("alpha2code_err_message")}}
              pattern={new RegExp("^[A-Z]{2}$")}
            />`
          : null
      }
      ${
        columnTitle === "alpha3code"
          ? `<PatternRule
              message={${formatMessage("alpha3code_err_message")}}
              pattern={new RegExp("^[A-Z]{3}$")}
            />`
          : null
      }
      ${columnTitle === "short_name_eng" ? `<RequiredRule />` : null}
    </Column>
    `;
    })
    .forEach((markup) => console.log(markup));

  return (
    <>
      <h2 className={"content-block"}>{formatMessage("countries")}</h2>

      <DataGrid
        dataSource={countriesStore}
        showBorders={true}
        repaintChangesOnly={true}
        remoteOperations={false}
        focusedRowEnabled={true}
        columnAutoWidth={true}
        columnHidingEnabled={false}
      >
        <FilterRow visible={true} />

        <Editing
          mode="row"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />

        <Column dataField="short_name" caption={formatMessage("short_name")}>
          <RequiredRule />
        </Column>

        <Column
          dataField="numeric"
          caption={formatMessage("numeric")}
          alignment="left"
          width={100}
        >
          <PatternRule
            message={formatMessage("numeric_err_message")}
            pattern={new RegExp("^[0-9]{0,4}$", "m")}
          />
        </Column>

        <Column
          dataField="alpha2code"
          caption={formatMessage("alpha2code")}
          width={100}
        >
          <RequiredRule />
          <PatternRule
            message={formatMessage("alpha2code_err_message")}
            pattern={new RegExp("^[A-Z]{2}$")}
          />
        </Column>

        <Column
          dataField="alpha3code"
          caption={formatMessage("alpha3code")}
          width={100}
        >
          <PatternRule
            message={formatMessage("alpha3code_err_message")}
            pattern={new RegExp("^[A-Z]{3}$")}
          />
          <RequiredRule />
        </Column>

        {/* columnsMarkup */}

        <Column
          dataField="short_name_eng"
          caption={formatMessage("short_name_eng")}
        >
          <RequiredRule />
        </Column>

        <Column
          dataField="short_name_karlat"
          caption={formatMessage("short_name_karlat")}
        />
        <Column
          dataField="short_name_rus"
          caption={formatMessage("short_name_rus")}
        />
        <Column
          dataField="short_name_uzcyr"
          caption={formatMessage("short_name_uzcyr")}
        />
        <Column
          dataField="short_name_uzlat"
          caption={formatMessage("short_name_uzlat")}
        />

        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} allowedPageSizes={[10, 20, 50]} />
      </DataGrid>
    </>
  );
};
