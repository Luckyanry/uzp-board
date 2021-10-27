import React, {useEffect, useState} from "react";

import TreeList, {
  SearchPanel,
  FilterRow,
  Scrolling,
  ColumnChooser,
  Editing,
  Column,
  RequiredRule,
  FormItem,
  Lookup,
  Button as TreeListButton,
  Paging,
  Pager,
  LoadPanel,
  StateStoring,
  Form,
} from "devextreme-react/tree-list";
import {
  SimpleItem,
  Tab,
  TabbedItem,
  TabPanelOptions,
  GroupItem,
} from "devextreme-react/form";
import {ColumnFixing} from "devextreme-react/data-grid";
import {Template} from "devextreme-react/core/template";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";
import {StatusLangToggler} from "../../components/StatusLangToggler/StatusLangToggler";
import DatailTreeListTab from "../../components/DetailTreeListTab/DetailTreeListTab";
import {
  checkIfArrIncludesValue,
  createCustomMsg,
  customPageAbbreviationMsg,
  getLookupParamsForURL,
} from "../../helpers/functions";

import spinner from "../../components/Spinner/icons/spinner.svg";
import folderIcon from "./icons/folder.svg";
import keyIcon from "./icons/key.svg";
import "./TreeListPage.scss";

export const TreeListPage = ({location: {pathname}}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState([]);
  const [lookDataState, setLookDataState] = useState([]);

  const [toggler, setToggler] = useState(false);
  const [expandRowsBtnText, setExpandRowsBtnText] =
    useState("msgExpandAllRows");

  const [formData, setFormData] = useState(null);
  const [popupTitle, setPopupTitle] = useState("msgCreateNewItem");

  const {formatMessage} = useLocalization();

  const pathnameWithoutSlash = pathname.split("/")[1];
  const localPathname = createCustomMsg(pathnameWithoutSlash);
  const localPageAbbreviation = formatMessage(
    customPageAbbreviationMsg(pathnameWithoutSlash)
  );

  const statusToggler = StatusLangToggler().statusToggler();

  const popupGeneralOptions = {
    title: formatMessage(popupTitle, localPageAbbreviation),
    showTitle: true,
    width: 1200,
    height: 800,
  };

  const popupDetailTreeListTabOptions = {
    title: formatMessage(popupTitle, localPageAbbreviation),
    showTitle: false,
    width: 1200,
    height: 900,
  };

  const popupOpt = {
    title: formatMessage(popupTitle, localPageAbbreviation),
    showTitle: true,
    width: 950,
    height: 800,
  };

  useEffect(() => {
    (async () => {
      const fetchColumnsSchemaData = FetchData(
        pathname,
        pathnameWithoutSlash,
        "hbdb"
      ).fetchData;

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
    })();

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

    function getAPIData() {
      if (
        checkIfArrIncludesValue(["auditSettingsMaster"], pathnameWithoutSlash)
      ) {
        const fetchData = FetchData(
          pathname,
          pathnameWithoutSlash,
          "logdb"
        ).fetchColumnsSchemaData;

        return setAPIData(fetchData);
      }

      if (pathnameWithoutSlash === "rights") {
        const fetchData = FetchData(
          pathname,
          pathnameWithoutSlash,
          "wisdb"
        ).rightsColumnsSchemaData;

        return setAPIData(fetchData);
      }

      if (pathnameWithoutSlash === "siteStructure") {
        const fetchData = FetchData(
          pathname,
          "ShortDicsRecordsFlat&@name=SiteStructure",
          "hbdb"
        ).fetchColumnsSchemaData;

        return setAPIData(fetchData);
      }

      const fetchData = FetchData(
        pathname,
        pathnameWithoutSlash,
        "hbdb"
      ).fetchColumnsSchemaData;

      setAPIData(fetchData);
    }
  }, [pathname, pathnameWithoutSlash]);

  function initNewRow(e) {
    e.data.status = statusToggler[0];

    setPopupTitle("msgAddNewItem");
  }

  function onEditingStart(e) {
    const formData = e.data;
    setFormData(formData);

    setPopupTitle("msgEditNewItem");
  }

  function clickHandler() {
    setExpandRowsBtnText(() =>
      expandRowsBtnText === "msgMinimisedAllRows"
        ? "msgExpandAllRows"
        : "msgMinimisedAllRows"
    );

    setToggler((toggler) => !toggler);

    if (toggler) {
      window.location.reload();
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
        // width = "100%",
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
          // width={width}
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
          cellTemplate={
            dataField === "RightName_eng" ? "rightsPageTemplate" : null
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

          {dataField === "status" && (
            <Lookup searchMode={"startswith"} dataSource={statusToggler} />
          )}
        </Column>
      );
    });
  }

  // function onFocusedCellChanging(e) {
  //   const formData = e.rows[e.newRowIndex].data;
  //   setFormData(formData);
  // }

  function customSimpleItemMarkup(formData) {
    if (!formData) {
      return;
    }

    return Object.keys(formData).map((item, idx) => {
      return <SimpleItem key={idx} dataField={item} />;
    });
  }

  function editorCustomMarkup() {
    return formData ? (
      <Editing
        mode="popup"
        popup={popupDetailTreeListTabOptions}
        allowAdding={true}
        allowDeleting={true}
        allowUpdating={true}
        useIcons={true}
      >
        <Form id="form" formData={formData} colCount={1} width={"100%"}>
          <GroupItem>
            <TabbedItem>
              <TabPanelOptions deferRendering={true} />

              <Tab title={formatMessage("msgTabAuditGeneral")} colCount={2}>
                {customSimpleItemMarkup(formData)}
              </Tab>

              <Tab title={formatMessage("msgTabAuditObjDB")} colCount={2}>
                <DatailTreeListTab
                  masterId={formData.id}
                  DetailTreeListPath={"auditSettings"}
                  formData={formData}
                />
              </Tab>
            </TabbedItem>
          </GroupItem>
        </Form>
      </Editing>
    ) : (
      <Editing
        mode="popup"
        popup={popupGeneralOptions}
        allowAdding={true}
        allowDeleting={true}
        allowUpdating={true}
        useIcons={true}
      />
    );
  }

  function onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: "after",
      widget: "dxButton",
      options: {
        icon: "hierarchy",
        width: "max-content",
        text: formatMessage(expandRowsBtnText),
        onClick: clickHandler,
      },
    });
  }

  function rightsNameTemplate(props) {
    const {
      data: {Used, RightName_eng},
    } = props;

    const styles = (icon, width = "20px") => ({
      bgIcon: {
        display: "inline-block",
        width,
        height: "20px",
        background: `url("${icon}") 0% 0% / 100% no-repeat`,
      },
    });

    const icon = () => {
      switch (Used) {
        case true:
          return styles(keyIcon).bgIcon;
        case false:
          return styles(folderIcon).bgIcon;

        default:
          return;
      }
    };

    return (
      <>
        <div className="img" style={icon()} />
        &nbsp;&nbsp;
        <span className="name">{RightName_eng}</span>
      </>
    );
  }

  return (
    <div id="treelist-page-wrapper" className="page-wrapper">
      <h2 className={"content-block"}>
        {formatMessage(`${localPathname}HeaderTitle`, localPageAbbreviation)}
      </h2>

      <TreeList
        id={pathnameWithoutSlash}
        dataSource={APIData}
        rootValue={0}
        keyExpr={pathnameWithoutSlash === "rights" ? "RIdx" : "id"}
        parentIdExpr={pathnameWithoutSlash === "rights" ? "RCIdx" : "pid"}
        // === rows ===
        showRowLines={true}
        focusedRowEnabled={true}
        rowAlternationEnabled={false}
        // === columns ===
        showColumnLines={true}
        columnMinWidth={60}
        columnAutoWidth={true}
        columnHidingEnabled={false}
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnResizingMode={"widget"}
        // === appearance ===
        hoverStateEnabled={true}
        wordWrapEnabled={true}
        virtualModeEnabled={true}
        // === functions ===
        autoExpandAll={toggler}
        onInitNewRow={initNewRow}
        onEditingStart={onEditingStart}
        // onFocusedCellChanging={onFocusedCellChanging}
        onToolbarPreparing={onToolbarPreparing}
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} />

        <ColumnChooser
          enabled={true}
          allowSearch={true}
          width={300}
          height={365}
          title={formatMessage("msgColomnChooser")}
          emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
        />

        <FilterRow visible={true} />
        <StateStoring
          enabled={false}
          type="localStorage"
          storageKey="storage"
        />

        <ColumnFixing enabled={true} />

        {pathnameWithoutSlash === "auditSettingsMaster" ? (
          editorCustomMarkup()
        ) : pathnameWithoutSlash === "soato" ? (
          <Editing
            mode="batch"
            allowAdding={true}
            allowUpdating={true}
            allowDeleting={true}
            useIcons={true}
            startEditAction="dblClick"
          />
        ) : (
          <Editing
            mode="popup"
            popup={popupOpt}
            allowAdding={true}
            allowUpdating={true}
            allowDeleting={true}
            useIcons={true}
          />
        )}

        {customMarkupRender()}

        <Template name="rightsPageTemplate" render={rightsNameTemplate} />

        <Column type="buttons" width={110}>
          <TreeListButton
            name="add"
            hint={formatMessage("msgAddNewItem", localPageAbbreviation)}
          />
          <TreeListButton
            name="edit"
            hint={formatMessage("msgEditNewItem", localPageAbbreviation)}
          />
          <TreeListButton
            name="delete"
            hint={formatMessage("msgDeleteNewItem", localPageAbbreviation)}
          />
        </Column>

        <Paging defaultPageSize={10} enabled={true} />

        <Pager
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
          allowedPageSizes={[10, 20, 50, 100, "all"]}
          showAllItem={true}
          visible={true}
        />

        <LoadPanel
          deferRendering={true}
          enabled="true"
          shading={true}
          showPane={false}
          width={400}
          height={140}
          message={formatMessage("msgLoadingMessage")}
          indicatorSrc={spinner}
        />
      </TreeList>
    </div>
  );
};
