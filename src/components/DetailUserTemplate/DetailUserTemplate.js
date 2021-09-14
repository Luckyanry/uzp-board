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

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";
// import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import {getLookupParamsForURL} from "../../helpers/functions";

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
        pathname,
        `w_DisplayUserRoles&@GID=${data.key}`,
        "wisdb"
      ).detailUserTemplateData;

      setAPIData(usersFetchData);
    }

    async function getLookDataState(
      lookupSpForURL,
      lookupDBForURL,
      dataField = null
    ) {
      const lookData = FetchData(
        pathname,
        lookupSpForURL,
        lookupDBForURL
      ).lookData;

      await lookData.store
        ._loadFunc()
        .then((res) => (lookData.store.__rawData = [...res.data]));

      setLookDataState((prev) =>
        dataField ? [...prev, {[dataField]: lookData}] : lookData
      );
    }

    getColumnsSchemaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          showEditorAlways={false}
          trueText={
            dataField === "status"
              ? formatMessage("msgStatusActive")
              : formatMessage("msgYes")
          }
          falseText={
            dataField === "status"
              ? formatMessage("msgStatusDeactivated")
              : formatMessage("msgNo")
          }
          {...params}
        >
          {required && <RequiredRule />}

          <FormItem {...formItem} />

          {lookup &&
            lookDataState.map((item, i) => {
              // eslint-disable-next-line
              if (!item[dataField]) return;

              // dataSource={{...item[dataField], ...lookup.dataSource}}
              return (
                <Lookup
                  key={i + dataField}
                  {...lookup}
                  dataSource={item[dataField]}
                />
              );
            })}
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
