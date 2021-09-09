import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  ColumnChooser,
  Editing,
  Column,
  RequiredRule,
  FormItem,
  Lookup,
  Button,
  Paging,
  Pager,
} from "devextreme-react/data-grid";
import {Tabs} from "devextreme-react/tabs";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";
// import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import "./DetailUserTemplate.scss";

export const DetailUserTemplate = ({data}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);
  const [lookDataState, setLookDataState] = useState(null);

  const {formatMessage} = useLocalization();
  // console.log(`props`, data);
  const pathname = "/w_DisplayUserRoles";
  const focusedRowTitle = data.data.UserName;

  const popupOpt = {
    title: formatMessage("msgCreateNewItem", focusedRowTitle),
    showTitle: true,
    width: 950,
    height: 780,
  };

  useEffect(() => {
    async function getColumnsSchemaData() {
      const fetchColumnsSchemaData = FetchData(
        formatMessage,
        pathname,
        "ShortDicsRecordsFlat&@name=DisplayUserRolesColumnSchema",
        "hbdb"
      ).fetchColumnsSchemaData;

      const result = await fetchColumnsSchemaData
        ._loadFunc()
        .then((res) => res.data);

      setColumnsSchemaData(result);
      getAPIData();

      const lookupSpForURL = getSpForURLFromLookup(result);

      if (lookupSpForURL) {
        getLookDataState(lookupSpForURL);
      }
    }

    async function getAPIData() {
      const usersFetchData = FetchData(
        formatMessage,
        pathname,
        `w_DisplayUserRoles&@GID=${data.key}`,
        "wisdb"
      ).detailUserTemplateData;

      setAPIData(usersFetchData);
    }

    async function getLookDataState(spForURL) {
      const lookData = FetchData(
        formatMessage,
        pathname,
        spForURL,
        "wisdb"
      ).lookData;
      const result = await lookData._loadFunc().then((res) => res.data);

      setLookDataState(result);
    }

    getColumnsSchemaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getSpForURLFromLookup(data) {
    const findLookup = data.find((item) => item.lookup);
    if (findLookup) {
      const getIsfetchField = findLookup.lookup.isfetch;
      // console.log(`getIsfetchField`, getIsfetchField);
      return getIsfetchField.split(".")[2];
    } else {
      return;
    }
  }

  function customMarkupRender() {
    return columnsSchemaData.map((item, idx) => {
      const {
        dataField,
        dataType = "string",
        caption = dataField,
        visible = false,
        disabled = false,
        required = false,
        width = "100%",
        minWidth = 250,
        alignment = "left",
        formItem = false,
        lookup = false,
        allowEditing = false,
        ...params
      } = item;

      return (
        <Column
          key={idx}
          dataField={dataField}
          dataType={dataType}
          caption={caption}
          visible={visible}
          disabled={disabled}
          width={width}
          alignment={alignment}
          minWidth={minWidth}
          allowEditing={allowEditing}
          {...params}
        >
          {required && <RequiredRule />}
          <FormItem {...formItem} />
          {lookup && (
            <Lookup
              dataSource={lookDataState}
              valueExpr={lookup.valueExpr}
              displayExpr={lookup.displayExpr}
            />
          )}
        </Column>
      );
    });
  }

  console.log(`columns`, columnsSchemaData);
  console.log(`dataSource`, APIData);
  const tabs = [{text: "Group/Role", icon: "user"}, {text: "Comment"}];

  return (
    <>
      {/* <ErrorBoundary msg={error}> */}
      <Tabs items={tabs} />
      <DataGrid
        id="grid"
        // columns={columnsSchemaData}
        dataSource={APIData}
        repaintChangesOnly={true}
        remoteOperations={false}
        // rows
        focusedRowEnabled={true}
        // columns
        showColumnLines={true}
        columnMinWidth={60}
        columnAutoWidth={true}
        columnHidingEnabled={false}
        allowColumnResizing={true}
        allowColumnReordering={true}
        // appearance
        hoverStateEnabled={true}
        wordWrapEnabled={true}
        // functions
      >
        <ColumnChooser
          enabled={true}
          allowSearch={true}
          width={300}
          height={320}
          title={formatMessage("msgColomnChooser")}
          emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
        />

        <Editing
          // mode="batch"
          mode="popup"
          popup={popupOpt}
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />

        {customMarkupRender()}

        <Column type="buttons" width={110}>
          <Button
            name="edit"
            hint={formatMessage("msgEditNewItem", focusedRowTitle)}
          />
          <Button
            name="delete"
            hint={formatMessage("msgDeleteNewItem", focusedRowTitle)}
          />
        </Column>

        <Paging defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          showNavigationButtons={true}
          showInfo={true}
          visible={true}
          allowedPageSizes={[10, 20, 50, 100, "all"]}
          showAllItem={true}
        />
      </DataGrid>

      {/* </ErrorBoundary> */}
    </>
  );
};
