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
  StateStoring,
  Scrolling,
  LoadPanel,
} from "devextreme-react/data-grid";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";
import {getLookupParamsForURL} from "../../helpers/functions";

import spinner from "../Spinner/icons/spinner.svg";
import "./UserDetailTab.scss";
import {ErrorPopup} from "..";

const UserDetailTab = ({user: {GID, UserName}, UserGroups}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);
  const [lookDataState, setLookDataState] = useState([]);

  const [errorStatus, setErrorStatus] = useState(null);

  const {formatMessage} = useLocalization();

  const pathname = `/${UserGroups}`;
  const focusedRowTitle = UserName;

  const popupOpt = {
    title: formatMessage("msgCreateNewItem", focusedRowTitle),
    showTitle: true,
    width: 950,
    height: 800,
  };

  useEffect(() => {
    async function getColumnsSchemaData() {
      const fetchColumnsSchemaData = FetchData(
        pathname,
        `ShortDicsRecordsFlat&@name=${UserGroups}ColumnSchema`,
        "hbdb"
      ).fetchColumnsSchemaData;

      const result = await fetchColumnsSchemaData
        ._loadFunc()
        .then((res) => res.data)
        .catch((err) => setErrorStatus(err));

      setColumnsSchemaData(result);
      getAPIData();

      const lookupParamsForURL = getLookupParamsForURL(result);

      if (lookupParamsForURL.length) {
        lookupParamsForURL.map(({sp, db, dataField}) =>
          getLookDataState(sp, db, dataField)
        );
      }
    }

    async function getAPIData() {
      const usersFetchData =
        UserGroups === "ISGroupObjectMembers"
          ? FetchData(pathname, `ObjectMembers&@GID=${GID}`, "wisdb")
              .detailUserTemplateData
          : FetchData(pathname, `${UserGroups}&@GID=${GID}`, "wisdb")
              .detailUserTemplateData;

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
        .then((res) => (lookData.store.__rawData = [...res.data]))
        .catch((err) => setErrorStatus(err));

      setLookDataState((prev) =>
        dataField ? [...prev, {[dataField]: lookData}] : lookData
      );
    }

    getColumnsSchemaData();
  }, [pathname, UserGroups, GID]);

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
        minWidth = 80,
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

  function initNewRow(e) {
    if (UserGroups === "ISGroupObjectMembers") {
      e.data.RGID = GID;
      return;
    }

    e.data.UGID = GID;
  }

  function onDataErrorEvent(e) {
    // e.error.message = formatMessage("msgErrUserDetailRoleGroup");
    // console.dir(e);
  }

  const errorMessage = errorStatus ? (
    <ErrorPopup errorState={errorStatus} popupPositionOf={"#grid"} />
  ) : null;

  return (
    <>
      {errorMessage}

      {!errorMessage && (
        <DataGrid
          id="grid"
          // columns={columnsSchemaData}
          dataSource={APIData}
          repaintChangesOnly={true}
          remoteOperations={false}
          // showBorders={true}
          // rows
          focusedRowEnabled={true}
          showRowLines={true}
          // columns
          showColumnLines={false}
          columnMinWidth={80}
          columnAutoWidth={true}
          columnHidingEnabled={false}
          allowColumnResizing={true}
          allowColumnReordering={true}
          // appearance
          hoverStateEnabled={true}
          wordWrapEnabled={true}
          showBorders={true}
          // functions
          onInitNewRow={initNewRow}
          onDataErrorOccurred={onDataErrorEvent}
        >
          <ColumnChooser
            enabled={true}
            allowSearch={true}
            width={300}
            height={320}
            title={formatMessage("msgColomnChooser")}
            emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
          />
          <Scrolling mode="standard" useNative="true" />
          <StateStoring
            enabled={false}
            type="localStorage"
            storageKey="storage"
          />

          <Editing
            mode="batch"
            // mode="popup"
            popup={popupOpt}
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={false}
            useIcons={true}
            startEditAction="dblClick"
          />

          {customMarkupRender()}

          <Column type="buttons">
            <Button
              name="delete"
              hint={formatMessage("msgDeleteNewItem", focusedRowTitle)}
            />
          </Column>

          <Paging defaultPageSize={5} enabled={true} />
          <Pager
            showPageSizeSelector={true}
            showNavigationButtons={true}
            showInfo={true}
            visible={true}
            allowedPageSizes={[5, 20, 50, "all"]}
            showAllItem={true}
          />
          <LoadPanel
            deferRendering={true}
            enabled="true"
            shading={false}
            showPane={false}
            width={400}
            height={140}
            message={formatMessage("msgLoadingMessage")}
            indicatorSrc={spinner}
          />
        </DataGrid>
      )}
    </>
  );
};

export default UserDetailTab;
