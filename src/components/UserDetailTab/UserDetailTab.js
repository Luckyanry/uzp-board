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
import TreeList from "devextreme-react/tree-list";
// import {Button} from "devextreme-react/button";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";
import {getLookupParamsForURL} from "../../helpers/functions";

import grant from "./icons/grant.svg";
import deny from "./icons/deny.svg";
import inherite from "./icons/inherite.svg";
import spinner from "../Spinner/icons/spinner.svg";
import "./UserDetailTab.scss";
// import {ErrorPopup} from "..";

const UserDetailTab = ({user: {GID, UserName}, fetchName}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);
  const [lookDataState, setLookDataState] = useState([]);

  // const [errorStatus, setErrorStatus] = useState(null);

  const {formatMessage} = useLocalization();

  const pathname = `/${fetchName}`;
  const pathnameWithoutSlash = fetchName;
  const focusedRowTitle = UserName;

  const popupOpt = {
    title: formatMessage("msgCreateNewItem", focusedRowTitle),
    showTitle: true,
    width: 1100,
    height: 850,
  };

  useEffect(() => {
    async function getColumnsSchemaData() {
      const fetchColumnsSchemaData = FetchData(
        pathname,
        `ShortDicsRecordsFlat&@name=${fetchName}ColumnSchema`,
        "hbdb"
      ).fetchColumnsSchemaData;

      const result = await fetchColumnsSchemaData
        ._loadFunc()
        .then((res) => res.data);
      // .catch((err) => setErrorStatus(err));

      setColumnsSchemaData(result);
      getAPIData();

      const lookupParamsForURL = getLookupParamsForURL(result);

      if (lookupParamsForURL.length) {
        lookupParamsForURL.map(({sp, db, dataField}) =>
          getLookDataState(sp, db, dataField)
        );
      }
    }

    // const usersFetchData =
    // fetchName === "ISGroupObjectMembers"
    //   ? FetchData(pathname, `ObjectMembers&@GID=${GID}`, "wisdb")
    //       .detailUserTemplateData
    //   : FetchData(pathname, `${fetchName}&@GID=${GID}`, "wisdb")
    //       .detailUserTemplateData;

    async function getAPIData() {
      if (fetchName === "ISGroupObjectMembers") {
        const usersFetchData = FetchData(
          pathname,
          `ObjectMembers&@GID=${GID}`,
          "wisdb"
        ).detailUserTemplateData;

        return setAPIData(usersFetchData);
      }

      if (fetchName === "ObjectPermissions") {
        const usersFetchData = await FetchData(
          pathname,
          `${fetchName}&@GID=${GID}`,
          "wisdb"
        ).loadObjIdData();

        return setAPIData(usersFetchData.data);
      }

      const usersFetchData = FetchData(
        pathname,
        `${fetchName}&@GID=${GID}`,
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
      // .catch((err) => setErrorStatus(err));

      setLookDataState((prev) =>
        dataField ? [...prev, {[dataField]: lookData}] : lookData
      );
    }

    getColumnsSchemaData();
  }, [pathname, fetchName, GID]);

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
          hidingPriority={dataField === "Description" ? 0 : null}
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

              return (
                <Lookup
                  searchMode={"startswith"}
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
    if (fetchName === "ISGroupObjectMembers") {
      e.data.RGID = GID;
      return;
    }

    fetchName !== "ObjectPermissions" && (e.data.UGID = GID);
  }

  function renderBtn(e, value) {
    const result = FetchData(
      pathname,
      `ObjectPermissions`,
      "wisdb"
    ).updateObjectPermissionsData(e.row.data.ObjId, GID, value);

    result.then(({data}) => {
      e.component
        .getDataSource()
        .store()
        .push([
          {
            type: "update",
            data: data[0],
            key: e.row.data.ObjId,
          },
        ]);
    });
  }

  const TreeListMarkup = () => (
    <TreeList
      id={pathnameWithoutSlash}
      // columns={columnsSchemaData}
      dataSource={APIData}
      rootValue={0}
      keyExpr="ObjId"
      parentIdExpr="PObjId"
      repaintChangesOnly={true}
      // remoteOperations={false}
      // rows
      focusedRowEnabled={true}
      showRowLines={true}
      rowAlternationEnabled={false}
      showBorders={true}
      // columns
      showColumnLines={true}
      // columnMinWidth={80}
      columnAutoWidth={true}
      columnHidingEnabled={true}
      allowColumnResizing={true}
      allowColumnReordering={true}
      // appearance
      hoverStateEnabled={true}
      wordWrapEnabled={true}
      virtualModeEnabled={true}
      autoExpandAll={false}
      // functions
      // onRowUpdating={updateRow}
      // onFocusedCellChanging={onFocusedCellChanging}
    >
      <Scrolling mode="standard" useNative="true" />
      <StateStoring enabled={false} type="localStorage" storageKey="storage" />
      <ColumnChooser
        enabled={true}
        allowSearch={true}
        width={300}
        height={320}
        title={formatMessage("msgColomnChooser")}
        emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
      />

      <Editing
        mode="batch"
        // mode="popup"
        popup={popupOpt}
        allowAdding={false}
        allowDeleting={false}
        allowUpdating={true}
        useIcons={true}
        startEditAction="dblClick"
      />

      {customMarkupRender()}

      <Column type="buttons">
        <Button
          icon={inherite}
          cssClass={"btn-icon"}
          name="inherite"
          hint={"inherite btn"}
          onClick={(e) => renderBtn(e, 2)}
          visible={(e) => e.row.data.OType !== 6}
        />

        <Button
          icon={deny}
          cssClass={"btn-icon"}
          name="deny"
          hint={"deny btn"}
          onClick={(e) => renderBtn(e, 0)}
          visible={(e) => e.row.data.OType !== 6}
        />

        <Button
          icon={grant}
          cssClass={"btn-icon"}
          name="grant"
          hint={"grant btn"}
          onClick={(e) => renderBtn(e, 1)}
          visible={(e) => e.row.data.OType !== 6}
        />
      </Column>

      <Paging defaultPageSize={10} enabled={true} />
      <Pager
        showPageSizeSelector={true}
        showInfo={true}
        showNavigationButtons={true}
        allowedPageSizes={[10, 20, 50, "all"]}
        showAllItem={true}
        visible={true}
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
    </TreeList>
  );

  const DataGridMarkup = () => (
    <DataGrid
      id={pathnameWithoutSlash}
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
      <StateStoring enabled={false} type="localStorage" storageKey="storage" />

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

      <Paging defaultPageSize={10} enabled={true} />
      <Pager
        showPageSizeSelector={true}
        showNavigationButtons={true}
        showInfo={true}
        visible={true}
        allowedPageSizes={[10, 20, 50, "all"]}
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
  );

  return fetchName === "ObjectPermissions" ? (
    <TreeListMarkup />
  ) : (
    <DataGridMarkup />
  );
};

export default UserDetailTab;
