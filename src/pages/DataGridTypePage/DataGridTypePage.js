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
  PatternRule,
  FormItem,
  Lookup,
  Button,
  Paging,
  Pager,
} from "devextreme-react/data-grid";

import {FetchData} from "../../api/pages-fetch";
import {useLocalization} from "../../contexts/LocalizationContext";
import {DetailTemplate} from "../../components/DetailTemplate/DetailTemplate";

import "./DataGridTypePage.scss";

export const DataGridTypePage = ({location: {pathname}}) => {
  const [APIData, setAPIData] = useState(null);
  const [lookDataState, setLookDataState] = useState(null);

  const {formatMessage} = useLocalization();
  const fetchData = FetchData(pathname, formatMessage).fetchData;
  const usersFetchData = FetchData(pathname, formatMessage).usersFetchData;
  const lookData = FetchData(pathname, formatMessage).lookData;

  const pathnameToNameWithoutSlash = pathname.split("/")[1];
  const localPathname = createCustomMsg(pathnameToNameWithoutSlash);
  const localPageAbbreviation = formatMessage(
    customPageAbbreviationMsg(pathnameToNameWithoutSlash)
  );

  const popupGeneralOptions = {
    title: formatMessage("msgCreateNewItem", localPageAbbreviation),
    showTitle: true,
    width: 1000,
    height: 600,
  };

  useEffect(() => {
    pathnameToNameWithoutSlash === "usersList" ||
    pathnameToNameWithoutSlash === "usersRole" ||
    pathnameToNameWithoutSlash === "usersGroup"
      ? setAPIData(usersFetchData)
      : setAPIData(fetchData);

    const getLookDataState = async () => {
      const result = await lookData._loadFunc().then((res) => res.data);
      setLookDataState(result);
    };

    pathnameToNameWithoutSlash === "ShortDics" && getLookDataState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function initNewRow(e) {}

  function createCustomMsg(message) {
    const changeFirstLetterToUpper = `${message[0].toUpperCase()}${message.slice(
      1
    )}`;
    return `msg${changeFirstLetterToUpper}`;
  }

  function customPageAbbreviationMsg(message) {
    return `msg${message[0].toUpperCase()}${message.slice(1)}Abbreviation`;
  }

  function customMarkupRender() {
    let murkupCollection = [];

    if (pathnameToNameWithoutSlash === "soogu") {
      const pageTitleCollection = [
        {
          value: "id",
          caption: "msgId",
          visible: true,
          disabled: true,
          required: false,
          width: 60,
          alignment: "right",
          formItem: true,
        },
        {
          value: "name_rus",
          caption: "msgNameRus",
          required: true,
          width: "100%",
        },
        {
          value: "name_uzcyr",
          caption: "msgNameUzcyr",
          visible: false,
          width: "100%",
        },
        {
          value: "name_uzlat",
          caption: "msgNameUzlat",
          visible: false,
          width: "100%",
        },
        {
          value: "name_karlat",
          caption: "msgNameKarlat",
          visible: false,
          width: "100%",
        },
        {
          value: "name_eng",
          caption: "msgNameEng",
          visible: false,
          width: "100%",
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToNameWithoutSlash === "countries") {
      const pageTitleCollection = [
        {
          value: "id",
          caption: "msgId",
          visible: true,
          disabled: true,
          width: 60,
          alignment: "right",
          formItem: true,
        },
        {
          value: "short_name",
          caption: "msgShortName",
          visible: false,
          required: true,
          width: "100%",
        },
        {value: "short_name_rus", caption: "msgShortNameRus", required: true},
        {value: "short_name_uzcyr", caption: "msgShortNameUzcyr"},
        {value: "short_name_uzlat", caption: "msgShortNameUzlat"},
        {value: "short_name_karlat", caption: "msgShortNameKarlat"},
        {value: "short_name_eng", caption: "msgShortNameEng"},
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToNameWithoutSlash === "ShortDics") {
      const pageTitleCollection = [
        {
          value: "id",
          caption: "msgId",
          visible: false,
          disabled: true,
          width: 60,
          alignment: "right",
          formItem: true,
        },
        {value: "name", caption: "msgMetaName", required: true, width: "100%"},
        {
          value: "short_name_rus",
          caption: "msgShortNameRus",
          visible: false,
          width: "100%",
        },
        {
          value: "short_name_uzcyr",
          caption: "msgShortNameUzcyr",
          visible: false,
          width: "100%",
        },
        {
          value: "short_name_uzlat",
          caption: "msgShortNameUzlat",
          visible: false,
          width: "100%",
        },
        {
          value: "short_name_karlat",
          caption: "msgShortNameKarlat",
          visible: false,
          width: "100%",
        },
        {
          value: "short_name_eng",
          caption: "msgShortNameEng",
          visible: false,
          width: "100%",
        },
        {value: "class", caption: "msgClass", width: 100, alignment: "center"},
        {value: "metaid", caption: "msgAsChildOf", lookup: true, width: "100%"},
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToNameWithoutSlash === "usersList") {
      const pageTitleCollection = [
        {value: "UserName", caption: "msgUserName", required: true, width: 200},
        {
          value: "Locale",
          caption: "msgLocale",
          width: 100,
          alignment: "center",
        },
        {
          value: "Locked",
          caption: "msgLocked",
          width: 120,
          alignment: "center",
        },
        {
          value: "Disabled",
          caption: "msgDisabled",
          width: 100,
          alignment: "center",
        },
        {value: "TimeZone", caption: "msgTimeZone", width: "100%"},
        {value: "created", caption: "msgCreated", width: 200},
        {value: "pwdlastchange", caption: "msgPwdLastChange", width: 200},
        {
          value: "UserType",
          caption: "msgUserType",
          width: 120,
          alignment: "center",
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (
      pathnameToNameWithoutSlash === "usersRole" ||
      pathnameToNameWithoutSlash === "usersGroup"
    ) {
      const pageTitleCollection = [
        {
          value: "UserName",
          caption: "msgUserName",
          required: true,
          width: "100%",
        },
        {
          value: "Disabled",
          caption: "msgDisabled",
          width: 100,
          alignment: "center",
        },
        {value: "created", caption: "msgCreated", width: "100%"},
        {
          value: "UserType",
          caption: "msgUserType",
          width: 120,
          alignment: "center",
        },
      ];

      murkupCollection = [...pageTitleCollection];
    }

    return murkupCollection.map((item, idx) => {
      const {
        value,
        caption = value,
        visible = true,
        disabled = false,
        required = false,
        width = "100%",
        alignment = "left",
        formItem = false,
        lookup = false,
        ...params
      } = item;

      return (
        <Column
          key={idx}
          dataField={value}
          caption={formatMessage(caption)}
          visible={visible}
          disabled={disabled}
          width={width}
          alignment={alignment}
          {...params}
        >
          {required && <RequiredRule />}
          {formItem && <FormItem visible={false} />}
          {lookup && (
            <Lookup
              dataSource={lookDataState}
              valueExpr="id"
              displayExpr="className"
            />
          )}
        </Column>
      );
    });
  }

  function customCodeMarkupRender() {
    let murkupCollection = [];

    if (pathnameToNameWithoutSlash === "soogu") {
      const pageTitleCollection = [
        {
          dataField: "CodeSogu",
          caption: "msgCodeSoogu",
          width: 120,
          message: "msgCodeSooguNumericErrMsg",
          pattern: "^[0-9]{4,5}$",
          required: true,
        },
        {
          dataField: "CodeOKPO",
          caption: "msgCodeOKPO",
          width: 120,
          message: "msgCodeOKPONumericErrMsg",
          pattern: "^[0-9]{0,8}$",
          required: true,
        },
      ];

      murkupCollection = [...pageTitleCollection];
    } else if (pathnameToNameWithoutSlash === "countries") {
      const pageTitleCollection = [
        {
          dataField: "alpha2code",
          caption: "msgAlpha2Code",
          width: 80,
          message: "msgAlpha2CodeErrMsg",
          pattern: "^[A-Z]{2}$",
          required: true,
        },
        {
          dataField: "alpha3code",
          caption: "msgAlpha3Code",
          width: 80,
          message: "msgAlpha3CodeErrMsg",
          pattern: "^[A-Z]{3}$",
          required: true,
        },
        {
          dataField: "numeric",
          caption: "msgNumeric",
          width: 100,
          message: "msgNumericErrMessage",
          pattern: "^[0-9]{0,4}$",
          required: false,
        },
      ];

      murkupCollection = [...pageTitleCollection];
    }

    return murkupCollection.map((item, idx) => {
      const {dataField, caption, width, message, pattern, required, ...params} =
        item;

      return (
        <Column
          key={idx}
          dataField={dataField}
          caption={formatMessage(caption)}
          alignment="center"
          width={width}
          visible={true}
          {...params}
        >
          <PatternRule
            message={formatMessage(message)}
            pattern={new RegExp(pattern)}
          />
          {required && <RequiredRule />}
        </Column>
      );
    });
  }

  return (
    <>
      <h2 className={"content-block"}>
        {formatMessage(`${localPathname}HeaderTitle`, localPageAbbreviation)}
      </h2>
      <DataGrid
        dataSource={APIData}
        // keyExpr="id"
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
        // onInitNewRow={initNewRow}
      >
        <Scrolling mode="standard" />
        <SearchPanel visible={true} width={250} />
        {/* <HeaderFilter visible={true} allowSearch={true} /> */}
        <ColumnChooser
          enabled={true}
          allowSearch={true}
          width={300}
          height={320}
          title={formatMessage("msgColomnChooser")}
          emptyPanelText={formatMessage("msgColomnChooserTextIfEmpty")}
        />
        <FilterRow visible={true} />

        <Editing
          mode="popup"
          popup={popupGeneralOptions}
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />

        {customMarkupRender()}

        {customCodeMarkupRender()}

        {pathnameToNameWithoutSlash === "ShortDics" && (
          <MasterDetail enabled={true} component={DetailTemplate} />
        )}

        <Column type="buttons" width={110}>
          <Button
            name="edit"
            hint={formatMessage("msgEditNewItem", localPageAbbreviation)}
          />
          <Button
            name="delete"
            hint={formatMessage("msgDeleteNewItem", localPageAbbreviation)}
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
    </>
  );
};
