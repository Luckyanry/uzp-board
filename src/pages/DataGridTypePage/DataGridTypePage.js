import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  SearchPanel,
  // HeaderFilter,
  FilterRow,
  Scrolling,
  ColumnChooser,
  Editing,
  MasterDetail,
  Column,
  RequiredRule,
  FormItem,
  Lookup,
  Paging,
  Pager,
  Form,
  LoadPanel,
  StateStoring,
  ColumnFixing,
  // Button,
} from "devextreme-react/data-grid";
import {
  Item,
  GroupItem,
  TabbedItem,
  TabPanelOptions,
  Tab,
} from "devextreme-react/form";
// eslint-disable-next-line
import TextArea from "devextreme-react/text-area";

import {useLocalization} from "../../contexts/LocalizationContext";
import {FetchData} from "../../api/pages-fetch";
import {
  checkIfArrIncludesValue,
  createCustomMsg,
  customPageAbbreviationMsg,
  // getFromSessionStorege,
  getLookupParamsForURL,
} from "../../helpers/functions";
import {
  StatusLangToggler,
  DetailTemplate,
  UserDetailTab,
  ColumnPwdGeneratorField,
  // DetailTreeListTab,
} from "../../components";
// import {ErrorPopup} from "../../components";

import spinner from "../../components/Spinner/icons/spinner.svg";
import "./DataGridTypePage.scss";

export const DataGridTypePage = ({location: {pathname}}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);
  const [formSchemaData, setFormSchemaData] = useState(null);
  const [lookDataState, setLookDataState] = useState([]);

  const [userID, setUserID] = useState("");
  const [userFormData, setUserFormData] = useState(null);
  const [userGroupItemCaption, setUserGroupItemCaption] = useState("");

  const [allowAdding, setAllowAdding] = useState(true);
  const [allowDeleting, setAllowDeleting] = useState(true);
  const [allowUpdating, setAllowUpdating] = useState(true);
  const [popupTitle, setPopupTitle] = useState("msgCreateNewItem");

  // const [errorStatus, setErrorStatus] = useState(null);

  const {formatMessage} = useLocalization();

  const pathnameWithoutSlash = pathname.split("/")[1];
  const localPathname = createCustomMsg(pathnameWithoutSlash);
  const localPageAbbreviation = formatMessage(
    customPageAbbreviationMsg(pathnameWithoutSlash)
  );

  const statusToggler = StatusLangToggler().statusToggler();

  useEffect(() => {
    async function getColumnsSchemaData() {
      const fetchColumnsSchemaData = FetchData(
        pathname,
        pathnameWithoutSlash,
        "hbdb"
      ).fetchData;

      const columns = await fetchColumnsSchemaData
        .load()
        .then((res) => res.data);
      // .catch((err) => setErrorStatus(err));

      setColumnsSchemaData(columns);

      if (
        checkIfArrIncludesValue(
          ["personObjects", "legals"],
          pathnameWithoutSlash
        )
      ) {
        const checkSpParam =
          pathnameWithoutSlash === "personObjects"
            ? "PersonObject"
            : "LegalObject";

        const fetchFormSchemaData = FetchData(
          pathname,
          `ShortDicsRecordsFlat&@name=${checkSpParam}FormSchema`
        ).fetchFormSchemaData();

        await fetchFormSchemaData.then((res) => setFormSchemaData(res.data[0]));
        // .catch((err) => setErrorStatus(err));
      }

      const lookupParamsForURL = getLookupParamsForURL(columns);

      if (lookupParamsForURL.length) {
        lookupParamsForURL.map(({sp, db, dataField}) =>
          getLookDataState(sp, db, dataField)
        );
      }

      getAPIData();
    }

    function getAPIData() {
      if (
        checkIfArrIncludesValue(
          ["userObjects", "roleObjects", "groupObjects", "objectMembers"],
          pathnameWithoutSlash
        )
      ) {
        const usersFetchData = FetchData(
          pathname,
          pathnameWithoutSlash,
          "wisdb"
        ).usersFetchData;

        return setAPIData(usersFetchData);
      }

      if (
        checkIfArrIncludesValue(
          ["personObjects", "orgUnits", "employees", "legals"],
          pathnameWithoutSlash
        )
      ) {
        const fetchData = FetchData(
          pathname,
          pathnameWithoutSlash,
          "odb"
        ).personFetchData;

        return setAPIData(fetchData);
      }

      if (pathnameWithoutSlash === "recordLog") {
        const fetchData = FetchData(
          pathname,
          pathnameWithoutSlash,
          "wisdb"
        ).usersFetchData;

        setAllowAdding(false);
        setAllowDeleting(false);
        setAllowUpdating(false);

        return setAPIData(fetchData);
      }

      if (pathnameWithoutSlash === "errorLog") {
        const fetchData = FetchData(
          pathname,
          "isysevents",
          "logdb"
        ).errorLogData;

        setAllowAdding(false);
        setAllowDeleting(false);
        setAllowUpdating(false);

        return setAPIData(fetchData);
      }

      const fetchData = FetchData(
        pathname,
        pathnameWithoutSlash,
        "hbdb"
      ).fetchColumnsSchemaData;

      return setAPIData(fetchData);
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

    pathnameWithoutSlash !== "ShortDics" && getColumnsSchemaData();

    if (pathnameWithoutSlash === "ShortDics") {
      getAPIData();
      getLookDataState(pathnameWithoutSlash);
    }
  }, [pathname, pathnameWithoutSlash]);

  const popupGeneralOptions = {
    title: formatMessage(popupTitle, localPageAbbreviation),
    showTitle: true,
    width: 1200,
    height: 800,
  };

  const popupPersonAndLegalOptions = {
    title: formatMessage(popupTitle, localPageAbbreviation),
    showTitle: true,
    fullScreen: true,
  };

  const popupUsersPageOptions = {
    title: formatMessage(popupTitle, localPageAbbreviation),
    showTitle: false,
    width: 1200,
    height: 900,
  };

  function initNewRow(e) {
    e.data.status = statusToggler[0];

    setUserID("");
    setPopupTitle("msgAddNewItem");
  }

  function onEditingStart() {
    setPopupTitle("msgEditNewItem");
  }

  function onFocusedCellChanging(e) {
    if (
      checkIfArrIncludesValue(
        ["userObjects", "roleObjects", "groupObjects", "objectMembers"],
        pathnameWithoutSlash
      )
    ) {
      const userFormData = e.rows[e.newRowIndex].data;
      const rowId = userFormData.GID;
      const groupItemCaption = userFormData.UserName;

      setUserID(rowId);
      setUserFormData(userFormData);
      setUserGroupItemCaption(groupItemCaption);
    }
  }

  function customMarkupRender() {
    let murkupCollection = [];

    checkIfArrIncludesValue(
      [
        "countries",
        "mahalla",
        "soogu",
        "userObjects",
        "roleObjects",
        "groupObjects",
        "objectMembers",
        "personObjects",
        "legals",
        "orgUnits",
        "employees",
        "recordLog",
        "errorLog",
      ],
      pathnameWithoutSlash
    ) && (murkupCollection = columnsSchemaData);

    if (pathnameWithoutSlash === "ShortDics") {
      const pageTitleCollection = [
        {
          dataField: "id",
          caption: "msgId",
          visible: false,
          disabled: true,
          width: 60,
          alignment: "right",
          formItem: true,
        },
        {
          dataField: "name",
          caption: "msgMetaName",
          required: true,
          width: "100%",
        },
        {
          dataField: "metaid",
          caption: "msgAsChildOf",
          lookup: true,
          width: "100%",
        },
      ];

      murkupCollection = [...pageTitleCollection];
    }

    return murkupCollection.map((item, idx) => {
      const {
        dataField,
        dataType = "string",
        caption = dataField,
        visible = true,
        disabled = false,
        required = false,
        // width = "100%",
        // minWidth = 80,
        alignment,
        formItem = false,
        lookup = false,
        allowEditing = true,
        ...params
      } = item;

      return (
        <Column
          key={idx}
          dataField={dataField}
          dataType={dataType}
          caption={
            pathnameWithoutSlash === "ShortDics"
              ? formatMessage(caption)
              : caption
          }
          visible={visible}
          disabled={disabled}
          // width={width}
          // width={dataField !== "id" ? width : 80}
          alignment={alignment}
          // minWidth={minWidth}
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
          // cellRender={renderPwdGridCell}
          {...params}
        >
          {required && <RequiredRule />}

          <FormItem {...formItem} />

          {lookup && pathnameWithoutSlash === "ShortDics" && (
            <Lookup
              searchMode={"startswith"}
              dataSource={lookDataState}
              valueExpr="id"
              displayExpr="className"
            />
          )}

          {lookup &&
            pathnameWithoutSlash !== "ShortDics" &&
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

  function customItemMarkup(formData) {
    if (!formData) {
      return;
    }

    return Object.keys(formData).map((item, idx) => (
      <Item key={idx} dataField={item}>
        {item === "Password" ? <ColumnPwdGeneratorField /> : null}
      </Item>
    ));
  }

  function editorCustomMarkup() {
    return userID ? (
      <Editing
        mode="popup"
        popup={popupUsersPageOptions}
        allowAdding={true}
        allowDeleting={true}
        allowUpdating={true}
        useIcons={true}
      >
        <Form id="form" formData={userFormData} colCount={1} width={"100%"}>
          <GroupItem caption={userGroupItemCaption}>
            <TabbedItem>
              <TabPanelOptions deferRendering={false} />
              <Tab title={formatMessage("msgInfoAboutUser")} colCount={2}>
                {customItemMarkup(userFormData)}
              </Tab>

              {checkIfArrIncludesValue(
                ["roleObjects", "userObjects"],
                pathnameWithoutSlash
              ) && (
                <Tab title={formatMessage("msgGroups")} colCount={2}>
                  <UserDetailTab user={userFormData} fetchName={"UserGroups"} />
                </Tab>
              )}

              {checkIfArrIncludesValue(
                ["groupObjects", "userObjects"],
                pathnameWithoutSlash
              ) && (
                <Tab title={formatMessage("msgRoles")} colCount={2}>
                  <UserDetailTab user={userFormData} fetchName={"UserRoles"} />
                </Tab>
              )}

              {checkIfArrIncludesValue(
                ["roleObjects", "groupObjects"],
                pathnameWithoutSlash
              ) && (
                <Tab title={formatMessage("msgMembers")} colCount={2}>
                  <UserDetailTab
                    user={userFormData}
                    fetchName={"ISGroupObjectMembers"}
                  />
                </Tab>
              )}

              <Tab title={formatMessage("msgPermissionsTab")} colCount={2}>
                <UserDetailTab
                  user={userFormData}
                  fetchName={"ObjectPermissions"}
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
      >
        <Form>
          {columnsSchemaData.map(({dataField}, idx) => {
            // eslint-disable-next-line
            if (!dataField) return;

            return (
              <Item key={idx} dataField={dataField}>
                {dataField === "Password" ? <ColumnPwdGeneratorField /> : null}
              </Item>
            );
          })}
        </Form>
      </Editing>
    );
  }

  return (
    <>
      <h2 className={"content-block"}>
        {formatMessage(`${localPathname}HeaderTitle`, localPageAbbreviation)}
      </h2>

      <DataGrid
        id={pathnameWithoutSlash}
        dataSource={APIData}
        // keyExpr="Received"
        // repaintChangesOnly={true}
        showBorders={false}
        remoteOperations={
          checkIfArrIncludesValue(
            ["errorLog", "mahalla", "recordLog"],
            pathnameWithoutSlash
          )
            ? {paging: true, sorting: true}
            : false
        }
        sorting={{mode: "multiple"}}
        // === rows ===
        focusedRowEnabled={true}
        showRowLines={true}
        // === columns ===
        showColumnLines={true}
        columnAutoWidth={true}
        columnHidingEnabled={false}
        allowColumnResizing={true}
        allowColumnReordering={true}
        columnResizingMode={"widget"}
        // === appearance ===
        hoverStateEnabled={true}
        wordWrapEnabled={true}
        // === functions ===
        onInitNewRow={initNewRow}
        onEditingStart={onEditingStart}
        onFocusedCellChanging={onFocusedCellChanging}
      >
        <ColumnChooser
          enabled={true}
          allowSearch={true}
          width={300}
          height={320}
          title={formatMessage("msgColomnChooser")}
          emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
        />

        <StateStoring
          enabled={false}
          type="localStorage"
          storageKey="storage"
        />

        <Scrolling mode="standard" useNative="true" />
        <SearchPanel visible={true} width={250} />
        <FilterRow visible={true} />
        <ColumnFixing enabled={true} />

        {checkIfArrIncludesValue(
          ["userObjects", "roleObjects", "groupObjects", "objectMembers"],
          pathnameWithoutSlash
        ) ? (
          editorCustomMarkup()
        ) : (
          <Editing
            mode="popup"
            popup={
              checkIfArrIncludesValue(
                ["personObjects", "legals"],
                pathnameWithoutSlash
              )
                ? popupPersonAndLegalOptions
                : popupGeneralOptions
            }
            allowAdding={allowAdding}
            allowDeleting={allowDeleting}
            allowUpdating={allowUpdating}
            form={
              checkIfArrIncludesValue(
                ["personObjects", "legals"],
                pathnameWithoutSlash
              )
                ? formSchemaData
                : null
            }
            useIcons={true}
          />
        )}

        {customMarkupRender()}

        {(pathnameWithoutSlash === "ShortDics" ||
          pathnameWithoutSlash === "recordLog") && (
          <MasterDetail enabled={true} component={DetailTemplate} />
        )}

        {/* <Column type="buttons" width={110}>
          <Button
            name="edit"
            hint={formatMessage("msgEditNewItem", localPageAbbreviation)}
          />
          <Button
            name="delete"
            hint={formatMessage("msgDeleteNewItem", localPageAbbreviation)}
          />
        </Column> */}

        <Paging defaultPageSize={10} enabled={true} />

        <Pager
          showPageSizeSelector={true}
          showNavigationButtons={true}
          showInfo={true}
          visible={true}
          allowedPageSizes={[10, 20, 50, 100, "all"]}
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
    </>
  );
};

// allowFixing={false}
// fixed={true}
// fixedPosition="right"

// <ColumnFixing enabled={true} />
// columnFixing={true}
