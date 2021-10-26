import React, {useEffect, useState} from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  SearchPanel,
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
  getLookupParamsForURL,
} from "../../helpers/functions";
import {
  StatusLangToggler,
  DetailTemplate,
  UserDetailTab,
} from "../../components";

import unvisible from "../../icons/visibilityOff.svg";
import visible from "../../icons/visibility.svg";
import enhancedEncryption from "../../icons/enhancedEncryption.svg";
import spinner from "../../components/Spinner/icons/spinner.svg";
import "./DataGridTypePage.scss";

export const DataGridTypePage = ({location: {pathname}}) => {
  const [columnsSchemaData, setColumnsSchemaData] = useState([]);
  const [APIData, setAPIData] = useState(null);
  const [formSchemaData, setFormSchemaData] = useState(null);
  const [lookDataState, setLookDataState] = useState([]);

  const [userID, setUserID] = useState("");
  const [userFormData, setUserFormData] = useState(null);

  const [allowAdding, setAllowAdding] = useState(true);
  const [allowDeleting, setAllowDeleting] = useState(true);
  const [allowUpdating, setAllowUpdating] = useState(true);
  const [popupTitle, setPopupTitle] = useState("msgCreateNewItem");

  const [minLength, setMinLength] = useState(8);
  const [maxLength, setMaxLength] = useState(128);
  const [minCharacterGroups, setMinCharacterGroups] = useState(4);

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

        setAPIData(fetchData);
        // console.log(`recordLog fetch`);
        return;
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

    getColumnsSchemaData();
  }, [pathname, pathnameWithoutSlash]);

  useEffect(() => {
    let ignore = false;

    const getPasswordPolicies = async () => {
      const dictionaryByName = FetchData(
        "/DictionaryByName",
        "ShortDicsRecords&@name=PasswordPolicies",
        "hbdb"
      ).passwordPolicies();

      await dictionaryByName
        .then((res) => res.data)
        .then((arr) => {
          setMinLength(arr[0].jvson.MinPasswordLength);
          setMaxLength(arr[0].jvson.MaxPasswordLength);
          setMinCharacterGroups(arr[0].jvson.MinCharacterGroups);
        });
    };

    pathnameWithoutSlash === "userObjects" &&
      minLength &&
      maxLength &&
      minCharacterGroups &&
      !ignore &&
      getPasswordPolicies();

    return () => {
      ignore = true;
    };
  }, [minLength, maxLength, minCharacterGroups, pathnameWithoutSlash]);

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
    title: formatMessage(popupTitle, localPathname),
    showTitle: false,
    width: 1200,
    height: 900,
  };

  function initNewRow(e) {
    e.data.status = statusToggler[0];

    setUserID("");
    setPopupTitle("msgAddNewItem");
  }

  function onEditingStart(e) {
    setPopupTitle("msgEditNewItem");

    if (
      checkIfArrIncludesValue(
        ["userObjects", "roleObjects", "groupObjects", "objectMembers"],
        pathnameWithoutSlash
      )
    ) {
      const userFormData = e.data;
      const rowId = userFormData.GID;

      setUserFormData(userFormData);
      setUserID(rowId);
    }
  }

  // function onFocusedCellChanging(e) {
  //   if (
  //     checkIfArrIncludesValue(
  //       ["userObjects", "roleObjects", "groupObjects", "objectMembers"],
  //       pathnameWithoutSlash
  //     )
  //   ) {
  //     const userFormData = e.rows[e.newRowIndex].data;
  //     // const rowId = userFormData.GID;
  //     // const groupItemCaption = userFormData.UserName;

  //     // setUserID(rowId);
  //     setUserFormData(userFormData);
  //     // setUserGroupItemCaption(groupItemCaption);
  //   }
  // }

  let textBoxInstance = undefined;

  const btnEyeOpts = {
    icon: visible,
    type: "button",
    onClick: () => {
      const btnIcon = textBoxInstance.option("buttons[0].options.icon");

      btnIcon === visible
        ? textBoxInstance.option("buttons[0].options.icon", unvisible)
        : textBoxInstance.option("buttons[0].options.icon", visible);

      const boxMode = textBoxInstance.option("mode");

      boxMode === "password"
        ? textBoxInstance.option("mode", "text")
        : textBoxInstance.option("mode", "password");
    },
  };

  const btnGenerateOpt = {
    icon: enhancedEncryption,
    type: "button",
    onClick: () => {
      const {setLower, setUpper, setNumber, setSymbol} = inputValidation();

      textBoxInstance.option(
        "value",
        passwordGenerator(setLower, setUpper, setNumber, setSymbol, minLength)
      );
    },
  };

  function saveTextBoxInstance(e) {
    textBoxInstance = e.component;
  }

  const pwdItemEditorOptions = {
    mode: "password",
    stylingMode: "outlined",
    onInitialized: saveTextBoxInstance,

    buttons: [
      {
        name: "msgShowPassword",
        location: "after",
        options: btnEyeOpts,
      },
      {
        name: "msgGenerateStrongPassword",
        location: "after",
        options: btnGenerateOpt,
      },
    ],
  };

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = `ˆ"'.:;!#$%&()*+-/<=>?@[]_{|}~`;
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function passwordGenerator(
    lower = true,
    upper = false,
    number = false,
    symbol = false,
    length
  ) {
    let generatedPassword = "";

    const typesCount = lower + upper + number + symbol;

    const typeArr = [{lower}, {upper}, {number}, {symbol}]
      .map((i) => [Math.random(), i])
      .sort()
      .map((i) => i[1])
      .filter((item) => Object.values(item)[0]);

    if (typesCount === 0) {
      return "";
    }

    for (let i = 0; i < length; i += typesCount) {
      // eslint-disable-next-line no-loop-func
      typeArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
  }

  function inputValidation() {
    const digitsRule = "0-9";
    const symbolRule = String.raw`\ˆ\"\'\.\:\;\!\#\$\%\&\(\)\*\+\-\/\<\=\>\?\@\[\]\_\{\|\}\~`;
    const lowerLetterRule = "a-z";
    const upperLetterRule = "A-Z";

    switch (minCharacterGroups) {
      case 1:
        return {
          setLower: true,
          patternRuleErrMsg: formatMessage("msgPwdPatternRuleErrMsgOneGroup"),
          regExp: `^(?=.*[${lowerLetterRule}])[${lowerLetterRule}]{${minLength},${maxLength}}$`,
        };
      case 2:
        return {
          setLower: true,
          setUpper: true,
          patternRuleErrMsg: formatMessage("msgPwdPatternRuleErrMsgTwoGroups"),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])[${lowerLetterRule}${upperLetterRule}]{${minLength},${maxLength}}$`,
        };
      case 3:
        return {
          setLower: true,
          setUpper: true,
          setNumber: true,
          patternRuleErrMsg: formatMessage(
            "msgPwdPatternRuleErrMsgThreeGroups"
          ),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])(?=.*[${digitsRule}])[${lowerLetterRule}${upperLetterRule}${digitsRule}]{${minLength},${maxLength}}$`,
        };
      case 4:
        return {
          setLower: true,
          setUpper: true,
          setNumber: true,
          setSymbol: true,
          patternRuleErrMsg: formatMessage("msgPwdPatternRuleErrMsgFourGroups"),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])(?=.*[${digitsRule}])(?=.*[${symbolRule}])[${lowerLetterRule}${upperLetterRule}${digitsRule}${symbolRule}]{${minLength},${maxLength}}$`,
        };

      default:
        return {
          setLower: true,
          setUpper: true,
          setNumber: true,
          setSymbol: true,
          patternRuleErrMsg: formatMessage("msgPwdPatternRuleErrMsgFourGroups"),
          regExp: `^(?=.*[${lowerLetterRule}])(?=.*[${upperLetterRule}])(?=.*[${digitsRule}])(?=.*[${symbolRule}])[${lowerLetterRule}${upperLetterRule}${digitsRule}${symbolRule}]{${minLength},${maxLength}}$`,
        };
    }
  }

  function customMarkupRender() {
    return columnsSchemaData.map((item, idx) => {
      const {
        dataField,
        dataType = "string",
        caption = dataField,
        visible = true,
        disabled = false,
        required = false,
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
          caption={caption}
          visible={visible}
          disabled={disabled}
          alignment={alignment}
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

  function customItemMarkup(formData) {
    if (!formData) {
      return;
    }

    return Object.keys(formData).map((item, idx) =>
      item !== "Password" ? (
        <Item key={idx} dataField={item} />
      ) : (
        <Item
          key={idx}
          dataField={"Password"}
          editorType={"dxTextBox"}
          editorOptions={pwdItemEditorOptions}
        />
      )
    );
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
          <GroupItem caption={userFormData.UserName}>
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

            return dataField !== "Password" ? (
              <Item key={idx} dataField={dataField} />
            ) : (
              <Item
                key={idx}
                dataField={"Password"}
                editorType={"dxTextBox"}
                editorOptions={pwdItemEditorOptions}
              />
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
        // onFocusedCellChanging={onFocusedCellChanging}
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

        {(pathnameWithoutSlash === "shortDics" ||
          pathnameWithoutSlash === "recordLog") && (
          <MasterDetail enabled={true} component={DetailTemplate} />
        )}

        {/* <Column type="buttons" width={110}>
          <Button
            name="edit"
            // hint={formatMessage("msgEditNewItem", localPageAbbreviation)}
          />
          <Button
            name="delete"
            // hint={formatMessage("msgDeleteNewItem", localPageAbbreviation)}
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
