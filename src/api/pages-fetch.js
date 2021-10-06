import CustomStore from "devextreme/data/custom_store";
import {alert} from "devextreme/ui/dialog";
import {formatMessage} from "devextreme/localization";
import "whatwg-fetch";
// import {getErrorData} from "../components/ErrorPopup/ErrorPopup";

import {StatusLangToggler} from "../components/StatusLangToggler/StatusLangToggler";
// import {setToSessionStorege} from "../helpers/functions";
import {urlAnonymous, urlBaseParam} from "./url-config";

export const FetchData = (
  pageRequest,
  sp = null,
  db = "hbdb",
  url = sessionStorage.getItem("sessionURL"),
  operation = "do"
) => {
  url = sessionStorage.getItem("sessionURL");
  const sessionURL = !url ? urlAnonymous : sessionStorage.getItem("sessionURL");

  const pageRequestParams = () => {
    switch (pageRequest) {
      case "/soogu":
        return `SooguColumnSchema`;
      case "/soato":
        return `SoatoColumnSchema`;
      case "/countries":
        return `CountriesColumnSchema`;
      case "/kopf":
        return `KopfColumnSchema`;
      case "/kfs":
        return `KfsColumnSchema`;
      case "/kspd":
        return `KspdColumnSchema`;
      case "/oked":
        return `OkedSchema`;
      case "/mahalla":
        return `MahallaColumnSchema`;

      case "/userObjects":
        return `ISUserAccountColumnSchema`;
      case "/roleObjects":
        return `ISRoleAccountColumnSchema`;
      case "/groupObjects":
        return `ISGroupAccountColumnSchema`;
      case "/isGroupObjectMembers":
        return `ISGroupObjectMembersColumnSchema`;

      case "/personObjects":
        return `PersonObjectColumnSchema`;

      case "/orgUnits":
        return `OrgUnitObjectColumnSchema`;
      case "/employees":
        return `EmployeeObjectColumnSchema`;
      case "/legals":
        return `LegalObjectColumnSchema`;

      case "/auditSettingsMaster":
        return `AuditSettingsMasterColumnSchema`;
      case "/recordLog":
        return `RecordLogColumnSchema`;
      case "/fieldLog":
        return `FieldLogColumnSchema`;

      default:
        return "/home";
    }
  };

  const finalUrl = `${sessionURL}${urlBaseParam}operation=${operation}&sp=ShortDicsRecordsFlat&@name=${pageRequestParams()}&db=${db}`;
  const urlFromPages = `${sessionURL}${urlBaseParam}operation=${operation}&sp=${sp}&db=${db}`;

  const fetchDataConstructor = (
    storeKey = "id",
    urlType = urlFromPages,
    valueType = "values",
    keyType = "@id"
  ) => {
    return new CustomStore({
      key: storeKey,
      load: () => sendRequest(urlType, {schema: "get"}),
      insert: (values) =>
        sendRequest(
          urlType,
          {
            schema: "ins",
            // [valueType]: JSON.stringify(values),
            [valueType]: StatusLangToggler().statusStringToBoolean(values),
          },
          "POST"
        ),
      update: (key, values) =>
        sendRequest(
          urlType,
          {
            schema: "upd",
            [keyType]: key,
            // [valueType]: JSON.stringify(values),
            [valueType]: StatusLangToggler().statusStringToBoolean(values),
          },
          "POST"
        ),
      remove: (key) => {
        // const newKey =
        return sendRequest(
          urlType,
          {
            schema: "del",
            [keyType]: typeof key !== "string" ? JSON.stringify(key) : key,
          },
          "POST"
        );
      },
      byKey: (key) =>
        sendRequest(
          urlType,
          {
            schema: "bykey",
            [keyType]: key,
          },
          "POST"
        ),
      onBeforeSend: function (method, ajaxOptions) {
        ajaxOptions.credentials = "include";
      },
      // errorHandler: (error) => {
      //   console.log("CustomStore error ", error);
      // },
    });
  };

  const fetchData = fetchDataConstructor("id", finalUrl, "values", "@id");

  const fetchColumnsSchemaData = fetchDataConstructor(
    "id",
    urlFromPages,
    "values",
    "@id"
  );

  const usersFetchData = fetchDataConstructor(
    "GID",
    urlFromPages,
    "@jvalues",
    "@gid"
  );

  const personFetchData = fetchDataConstructor(
    "oid",
    urlFromPages,
    "@jvalues",
    "@oid"
  );

  const detailUserTemplateData = fetchDataConstructor(
    ["RGID", "UGID", "IFC"],
    urlFromPages,
    "values",
    "values"
  );

  const lookData = {
    store: new CustomStore({
      key: "id",
      loadMode: "raw",
      load: () => sendRequest(urlFromPages, {schema: "look"}),
    }),
    paginate: true,
    pageSize: 20,
  };

  const signInUserData = async (params, method = "GET") =>
    await sendRequest(urlFromPages, {schema: "dbo", ...params}, method);

  const loadCustumMessageData = async () =>
    await sendRequest(urlFromPages, {schema: "get"}, "POST");

  const changeMyLocalToData = async (newKey) =>
    await sendRequest(urlFromPages, {schema: "dbo", "@newkey": newKey}, "POST");

  const loadObjIdData = async () =>
    await sendRequest(urlFromPages, {schema: "get"});

  const updateObjIdData = async (ObjId, dbName, objName, values) =>
    await sendRequest(
      urlFromPages,
      {
        schema: "upd",
        "@ObjId": ObjId,
        "@dbName": dbName,
        "@objName": objName,
        values: JSON.stringify(values),
      },
      "POST"
    );

  const passwordPolicies = async () =>
    await sendRequest(urlFromPages, {schema: "get"}); // різниця

  const fetchFormSchemaData = async () =>
    await sendRequest(urlFromPages, {schema: "get"});

  async function sendRequest(url, data = {}, method = "GET") {
    const params = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");

    const getOptions = {
      method,
      // cache: false,
      credentials: "include",
    };

    const postOptions = {
      method,
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      // cache: false,
      credentials: "include",
    };
    // debugger;
    if (method === "GET") {
      const response = await fetch(`${url}&${params}`, getOptions);

      if (response.ok) {
        return await response
          .json()
          .then((data) => responseData(data))
          .catch((err) => {
            isJSONBrokeError(err);
            consoleError(err, "GET");
          });
      } else {
        return await response.json().then((error) => {
          isServerError(error, response.status);
        });
      }
    }

    const response = await fetch(url, postOptions);

    if (response.ok) {
      return await response
        .text()
        .then((data) => responseData(data))
        .catch((err) => {
          isJSONBrokeError(err);
          consoleError(err, "POST");
        });
    } else {
      return await response
        .text()
        .then((error) => isServerError(JSON.parse(error), response.status));
    }
  }

  function responseData(data) {
    let newData = null;

    if (Array.isArray(data)) {
      data.length && data[0].status
        ? (newData = StatusLangToggler().statusBooleanToString(data))
        : (newData = data);

      return {
        data: newData,
        totalCount: newData.length,
      };
    }

    if (typeof data === "object") {
      const errorCheck = Object.keys(data).includes("JSONErrorMessage");

      if (!errorCheck) return data;

      console.error(`responseData object err `, data);
      JSONErrorMessage(data);
      // setToSessionStorege("error", data);

      throw data.VBErr.Description;
    }

    if (typeof data === "string") {
      const errorCheck = Object.keys(JSON.parse(data)).includes(
        "JSONErrorMessage"
      );

      if (!errorCheck) return data && JSON.parse(data);

      console.error(`responseData string err `, JSON.parse(data));
      JSONErrorMessage(JSON.parse(data));

      throw JSON.parse(data);
    }
  }

  function isServerError(error, status) {
    return alert(
      `
        <font color='red'><b>Error Status:</b></font> ${status}
        <br>
        <font color='red'><b>${error.JSONErrorMessage}</b></font>
      `,
      `${formatMessage("msgErrServerFetch")}`
    );
  }

  function isJSONBrokeError(error) {
    const isJSONTypeBrokeErr = Object.keys(error).includes("message");

    return (
      isJSONTypeBrokeErr &&
      alert(
        `<font color='red'><b>${error.message}</b></font>`,
        `${formatMessage("msgJSONBrokeErr")}`
      )
    );
  }

  function JSONErrorMessage(error) {
    return alert(
      `
        <font color='red'><b>${error.JSONErrorMessage}</b></font>
        <br>
        <br>
        ${
          error.VBErr
            ? `<font color='red'><b>Description:</b></font> ${error.VBErr.Description}`
            : ""
        }
        <br>
        <font color='red'><b>Fetch into url:</b></font> ${url}
        <br>
        <font color='red'><b>Method:</b></font> GET
        <br>
        ${
          error.VBErr
            ? `<font color='red'><b>Error Number:</b></font> ${error.VBErr.Number}`
            : ""
        }
        <br>
        ${
          error.VBErr
            ? `<font color='red'><b>Source:</b></font> ${error.VBErr.Source}`
            : ""
        }
      `,
      `${formatMessage("msgError")}`
    );
  }

  function consoleError(err, method) {
    return console.error(`
    ${err}

    ${err.VBErr ? `Description: ${err.VBErr.Description}` : ""}
    Fetch into url: ${url}
    Method: ${method}
    ${err.VBErr ? `Error Number: ${err.VBErr.Number}` : ""}
    ${err.VBErr ? `Source: ${err.VBErr.Source}` : ""}
  `);
  }

  return {
    fetchColumnsSchemaData,
    fetchData,
    lookData,
    usersFetchData,
    personFetchData,
    detailUserTemplateData,
    passwordPolicies,
    signInUserData,
    loadCustumMessageData,
    changeMyLocalToData,
    loadObjIdData,
    updateObjIdData,
    fetchFormSchemaData,
  };
};

// ?experement with this article => https://js.devexpress.com/Documentation/Guide/UI_Components/TreeList/How_To/Bind_a_Lookup_Column_to_a_Custom_Data_Source/

// const signInUserData = new CustomStore({
//   key: "uid",
//   load: async (params, method = "GET") =>
//     await sendRequest(
//       urlFromPages,
//       {
//         schema: "dbo",
//         ...params,
//       },
//       method
//     ),
// });

// const loadCustumMessageData = new CustomStore({
//   key: "id",
//   loadMode: "row",
//   load: async () => await sendRequest(urlFromPages, {schema: "get"}, "POST"),
// });
