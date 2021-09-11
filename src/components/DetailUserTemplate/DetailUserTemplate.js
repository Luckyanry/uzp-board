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
import {TabPanel, Item} from "devextreme-react/tab-panel";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";
// import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import "./DetailUserTemplate.scss";

export const DetailUserTemplate = ({data}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);
  const [lookDataState, setLookDataState] = useState([]);

  const {formatMessage} = useLocalization();

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

      const lookupParamsForURL = getLookupParamsForURL(result);
      // console.log(`lookupParamsForURL `, lookupParamsForURL);

      if (lookupParamsForURL.length) {
        lookupParamsForURL.map(({sp, db, dataField}) =>
          getLookDataState(sp, db, dataField)
        );
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

    async function getLookDataState(lookupSpForURL, lookupDBForURL, dataField) {
      const lookData = FetchData(
        formatMessage,
        pathname,
        lookupSpForURL,
        lookupDBForURL
      ).lookData;

      const result = await lookData._loadFunc().then((res) => res.data);
      // console.log(`result => `, result);
      setLookDataState((prev) => [...prev, {[dataField]: result}]);
      // setLookDataState((prev) => [...prev, result]);
      // setLookDataState(result);
    }

    getColumnsSchemaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getLookupParamsForURL(data) {
    const findLookup = data.filter(({lookup}) => lookup);

    if (!findLookup) return;

    const result = findLookup.map(({lookup, dataField}) => {
      const getDBFormLookup = lookup.isfetch.split(".")[0];
      const getSpFormLookup = lookup.isfetch.split(".")[2];

      return {sp: getSpFormLookup, db: getDBFormLookup, dataField};
    });

    return result;
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

          {lookup &&
            lookDataState.map((item) => {
              // console.log(`columnsSchemaData `, columnsSchemaData);
              // console.log("lookDataState in ", lookDataState);
              // console.log("item ", item);
              // console.log("item before ", item[dataField]);

              // eslint-disable-next-line
              if (!item[dataField]) return;

              console.log("item after ", item[dataField]);

              // setLookDataState([]);

              return (
                <Lookup key={idx} {...lookup} dataSource={item[dataField]} />
              );
            })}
          {/* 
          {lookup && (
              <Lookup key={idx} {...lookup} dataSource={lookDataState} />
            ) &&
            console.log("lookDataState => LookIn ", lookDataState)} */}
        </Column>
      );
    });
  }

  return (
    <>
      {/* <ErrorBoundary msg={error}> */}
      <TabPanel>
        <Item title="Group/Role">
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
        </Item>
        <Item title="Members">
          <h2>New tab with info about Members...</h2>
        </Item>
      </TabPanel>
      {/* </ErrorBoundary> */}
    </>
  );
};
