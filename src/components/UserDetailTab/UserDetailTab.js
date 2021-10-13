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
  ColumnFixing,
} from "devextreme-react/data-grid";
import TreeList from "devextreme-react/tree-list";
import {Template} from "devextreme-react/core/template";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";
import {getLookupParamsForURL} from "../../helpers/functions";
// import {IconsCellRenderTemplate} from "..";

import grant from "./icons/grant.svg";
import deny from "./icons/deny.svg";
import inherite from "./icons/inherite.svg";
import object from "./icons/object.svg";
import group from "./icons/group.svg";
import role from "./icons/role.svg";
import system from "./icons/system.svg";
import objectOff0 from "./icons/objectOff0.svg";
import objectOn1 from "./icons/objectOn1.svg";
import objectEmpty2 from "./icons/objectEmpty2.svg";
import containerOff3 from "./icons/containerOff3.svg";
import containerOn4 from "./icons/containerOn4.svg";
import containerEmpty5 from "./icons/containerEmpty5.svg";
import folder from "./icons/folder.svg";
import roleOff7 from "./icons/roleOff7.svg";
import roleOn8 from "./icons/roleOn8.svg";
import roleEmpty9 from "./icons/roleEmpty9.svg";
import groupOff10 from "./icons/groupOff10.svg";
import groupOn11 from "./icons/groupOn11.svg";
import groupEmpty12 from "./icons/groupEmpty12.svg";
import spinner from "../Spinner/icons/spinner.svg";
import "./UserDetailTab.scss";

const UserDetailTab = ({user: {GID, UserName}, fetchName}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);
  const [lookDataState, setLookDataState] = useState([]);

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
        .load()
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
      console.log(`usersFetchData `, usersFetchData);
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
          cellTemplate={
            dataField === "aName"
              ? "objPermissionsOTypeTemplate"
              : dataField === "InheritedName"
              ? "objPermissionsInhTypeTemplate"
              : null
          }
          calculateCellValue={
            dataField === "aName" ? (rowData) => rowData.OType : null
          }
          calculateDisplayValue={dataField === "aName" ? "aName" : null}
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

  function onClickHandlerCustomBtn(e, value) {
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

  function inheritedNameCellRenderTemplate(props) {
    const {
      data: {InhType, InheritedName},
    } = props;

    const styles = (icon) => ({
      bgIcon: {
        display: "inline-block",
        width: "20px",
        height: "16px",
        background: `url("${icon}") 0% 0% / 100% no-repeat`,
      },
    });

    const icon = () => {
      switch (InhType) {
        case 0:
          return styles(object).bgIcon;
        case 1:
          return styles(group).bgIcon;
        case 2:
          return styles(system).bgIcon;
        case 3:
          return styles(role).bgIcon;

        default:
          return;
      }
    };

    return (
      <>
        <div className="img" style={icon()} />
        &nbsp;&nbsp;
        <span className="name">{InheritedName}</span>
      </>
    );
  }

  function aNameCellRenderTemplate(props) {
    const {
      data: {OType, aName},
    } = props;

    const styles = (icon) => ({
      bgIcon: {
        display: "inline-block",
        width: "16px",
        height: "16px",
        background: `url("${icon}") 0% 0% / 100% no-repeat`,
      },
    });

    const icon = () => {
      switch (OType) {
        case 0:
          return styles(objectOff0).bgIcon;
        case 1:
          return styles(objectOn1).bgIcon;
        case 2:
          return styles(objectEmpty2).bgIcon;
        case 3:
          return styles(containerOff3).bgIcon;
        case 4:
          return styles(containerOn4).bgIcon;
        case 5:
          return styles(containerEmpty5).bgIcon;
        case 6:
          return styles(folder).bgIcon;
        case 7:
          return styles(roleOff7).bgIcon;
        case 8:
          return styles(roleOn8).bgIcon;
        case 9:
          return styles(roleEmpty9).bgIcon;
        case 10:
          return styles(groupOff10).bgIcon;
        case 11:
          return styles(groupOn11).bgIcon;
        case 12:
          return styles(groupEmpty12).bgIcon;

        default:
          return;
      }
    };

    return (
      <>
        <div className="img" style={icon()} />
        &nbsp;&nbsp;
        <span className="name">{aName}</span>
      </>
    );
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
      // columnHidingEnabled={true}
      columnHidingEnabled={false}
      allowColumnReordering={true}
      allowColumnResizing={true}
      columnResizingMode={"widget"}
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
      <ColumnFixing enabled={true} />

      <Editing
        mode="batch"
        // mode="popup"
        popup={popupOpt}
        allowAdding={false}
        allowDeleting={false}
        allowUpdating={false}
        useIcons={true}
        startEditAction="dblClick"
      />

      {customMarkupRender()}

      <Column type="buttons" width={100}>
        <Button
          icon={deny}
          cssClass={"btn-icon"}
          name="deny"
          hint={"deny btn"}
          onClick={(e) => onClickHandlerCustomBtn(e, 0)}
          visible={(e) => e.row.data.OType !== 6}
        />

        <Button
          icon={inherite}
          cssClass={"btn-icon"}
          name="inherite"
          hint={"inherite btn"}
          onClick={(e) => onClickHandlerCustomBtn(e, 2)}
          visible={(e) => e.row.data.OType !== 6}
        />

        <Button
          icon={grant}
          cssClass={"btn-icon"}
          name="grant"
          hint={"grant btn"}
          onClick={(e) => onClickHandlerCustomBtn(e, 1)}
          visible={(e) => e.row.data.OType !== 6}
        />
      </Column>

      <Template
        name="objPermissionsInhTypeTemplate"
        render={inheritedNameCellRenderTemplate}
      />

      <Template
        name="objPermissionsOTypeTemplate"
        render={aNameCellRenderTemplate}
      />

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
      allowColumnReordering={true}
      allowColumnResizing={true}
      columnResizingMode={"widget"}
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
      <ColumnFixing enabled={true} />

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

      <Column type="buttons" width={100}>
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
