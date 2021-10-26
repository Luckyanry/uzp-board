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

      case "/siteStructure":
        return `SiteStructureColumnSchema`;
      case "/rights":
        return `RightsColumnSchema`;
      case "/auditSettingsMaster":
        return `AuditSettingsMasterColumnSchema`;
      case "/recordLog":
        return `RecordLogColumnSchema`;
      case "/fieldLog":
        return `FieldLogColumnSchema`;
      case "/errorLog":
        return `isyseventsColumnSchema`;

      case "/shortDics":
        return `ShortDicsColumnSchema`;

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
      load: (loadOptions) => {
        let mergedOpts = {};

        if (loadOptions !== undefined) {
          [
            "skip",
            "take",
            "requireTotalCount",
            //"sort", "filter", "totalSummary"
          ].forEach(function (i) {
            if (
              loadOptions[i] !== undefined &&
              loadOptions[i] !== null &&
              i in loadOptions &&
              loadOptions[i] !== ""
            ) {
              mergedOpts["@" + i] = JSON.stringify(loadOptions[i]);
            }
          });
        }

        mergedOpts["schema"] = "get";
        // console.log(`fetchDataConstructor`);
        return sendRequest(urlType, mergedOpts).then((response) => {
          if (loadOptions && loadOptions.requireTotalCount === true) {
            return {
              data: response.data,
              totalCount: response.totalCount,
            };
          } else {
            return response;
          }
        });
      },

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

  const rightsColumnsSchemaData = fetchDataConstructor(
    "RIdx",
    urlFromPages,
    "values",
    "@RIdx"
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

  const errorLogData = fetchDataConstructor("EventId", urlFromPages);

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

  const updateObjectPermissionsData = async (ObjId, GID, New) =>
    await sendRequest(
      urlFromPages,
      {
        schema: "upd",
        "@ObjId": ObjId,
        "@GID": GID,
        "@New": New,
      },
      "POST"
    );

  const passwordPolicies = async () =>
    await sendRequest(urlFromPages, {schema: "get"});

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
      credentials: "include",
    };

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
    }
  }

  function isServerError(error, status) {
    return alert(
      `
        <font color='red'><b>${error.JSONErrorMessage}</b></font>
        <br>
        <br>
        <font color='red'><b>Error Status:</b></font> ${status}
        <br>
        ${
          error.E500Category
            ? `<font color='red'><b>Category::</b></font> ${error.E500Category}`
            : ""
        }
        <br>
        ${
          error.E500Description
            ? `<font color='red'><b>Description:</b></font> ${error.E500Description}`
            : ""
        }
        <br>
        ${
          error.E500File
            ? `<font color='red'><b>File:</b></font> ${error.E500File}`
            : ""
        }
        <br>
        ${
          error.E500Line
            ? `<font color='red'><b>Line:</b></font> ${error.E500Line}`
            : ""
        }
        <br>
        ${
          error.E500Column
            ? `<font color='red'><b>Column:</b></font> ${error.E500Column}`
            : ""
        }
        <br>
        ${
          error.E500Number
            ? `<font color='red'><b>Number:</b></font> ${error.E500Number}`
            : ""
        }
        <br>
        ${
          error.E500Source
            ? `<font color='red'><b>Source:</b></font> ${error.E500Source}`
            : ""
        }
        <br>
        ${
          error.ScriptFile
            ? `<font color='red'><b>ScriptFile:</b></font> ${error.ScriptFile}`
            : ""
        }
        <br>
        ${
          error.E500ASPCode
            ? `<font color='red'><b>ASPCode:</b></font> ${error.E500ASPCode}`
            : ""
        }
        <br>
        ${
          error.E500ASPDescription
            ? `<font color='red'><b>ASPDescription:</b></font> ${error.E500ASPDescription}`
            : ""
        }
      `,
      `Server Error!`
    );
  }

  function isJSONBrokeError(error) {
    const isJSONTypeBrokeErr = Object.keys(error).includes("message");

    return (
      !isJSONTypeBrokeErr &&
      alert(
        `<font color='red'><b>${error.message}</b></font>
        <br>
        <br>
        ${
          error.stack
            ? `<font color='red'><b>Description:</b></font> ${error.stack}`
            : ""
        }
        `,
        `${
          formatMessage("msgJSONBrokeErr")
            ? formatMessage("msgJSONBrokeErr")
            : "Error! JSON type is incorrect."
        }`
      )
    );
  }

  function JSONErrorMessage({JSONErrorMessage, VBErr, ADOErrors}) {
    return alert(
      `
        <font color='red'><b>${JSONErrorMessage}</b></font>
        <br>
        <br>
        ${
          VBErr.Description
            ? `<font color='red'><b>Description:</b></font> ${VBErr.Description}`
            : `<font color='red'><b>Description:</b></font> ${ADOErrors[0].Description}`
        }
        <br>
        <font color='red'><b>Fetch into url:</b></font> ${url}
        <br>
        <font color='red'><b>Method:</b></font> GET
        <br>
        ${
          VBErr.Number
            ? `<font color='red'><b>Error Number:</b></font> ${VBErr.Number}`
            : ""
        }
        <br>
        ${
          VBErr.Source
            ? `<font color='red'><b>Source:</b></font> ${VBErr.Source}`
            : ""
        }
      `,
      `${
        formatMessage("msgError")
          ? formatMessage("msgError")
          : "Backend Server Error!"
      }`
    );
  }

  function consoleError(err, method) {
    return console.error(`
    ${err}

    ${err.VBErr.Description ? `Description: ${err.VBErr.Description}` : ""}
    Fetch into url: ${url}
    Method: ${method}
    ${err.VBErr.Number ? `Error Number: ${err.VBErr.Number}` : ""}
    ${err.VBErr.Source ? `Source: ${err.VBErr.Source}` : ""}
  `);
  }

  return {
    fetchColumnsSchemaData,
    fetchData,
    lookData,
    usersFetchData,
    personFetchData,
    detailUserTemplateData,
    errorLogData,
    rightsColumnsSchemaData,
    passwordPolicies,
    signInUserData,
    loadCustumMessageData,
    changeMyLocalToData,
    loadObjIdData,
    updateObjIdData,
    fetchFormSchemaData,
    updateObjectPermissionsData,
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

// =================================

// const postOptions = {
//   method,
//   body: params,
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//   },
//   // cache: false,
//   credentials: "include",
// };
// debugger;

// const response = await fetch(url, postOptions);

// if (response.ok) {
//   return await response
//     .text()
//     .then((data) => responseData(data))
//     .catch((err) => {
//       isJSONBrokeError(err);
//       consoleError(err, "POST");
//     });
// } else {
//   return await response
//     .text()
//     .then((error) => isServerError(JSON.parse(error), response.status));
// }

// ================================
// if (typeof data === "string") {
//   const errorCheck = Object.keys(JSON.parse(data)).includes(
//     "JSONErrorMessage"
//   );

//   if (!errorCheck) return data && JSON.parse(data);

//   console.error(`responseData string err `, JSON.parse(data));
//   JSONErrorMessage(JSON.parse(data));
// }

// ==================================
// function errorMarkup(ADOErrors) {
//   if (!ADOErrors) return;
//   console.log(`ADOErrors`, ADOErrors);
//   return ADOErrors.map(
//     ({Description, NativeError, Number, SQLState, Source}, idx) => (
//       <Fragment key={idx}>
//         <p>
//           {/* <font color="red">
//             <b>Description:</b>
//           </font> */}
//           {Description}
//         </p>

//         {/* <font color="red">
//           <b>NativeError:</b>
//         </font>
//         {NativeError}
//         <font color="red">
//           <b>Number:</b>
//         </font>
//         {Number}
//         <font color="red">
//           <b>SQLState:</b>
//         </font>
//         {SQLState}
//         <font color="red">
//           <b>Source:</b>
//         </font>
//         {Source} */}
//       </Fragment>
//     )
//   );
// }

// ===========================================
// console.log(`errorLogData`, errorLogData);
// const errorLogData = new CustomStore({
//   key: "EventId",
//   loadMode: "processed",
//   load: (loadOptions) => {
//     console.log(`loadOptions `, loadOptions);

//     let mergedOpts = {};

//     [
//       "skip",
//       "take",
//       "requireTotalCount",
//       "sort",
//       //"filter",
//       // "totalSummary",
//     ].forEach(function (i) {
//       if (
//         i in loadOptions &&
//         loadOptions[i] !== undefined &&
//         loadOptions[i] !== null &&
//         loadOptions[i] !== ""
//       ) {
//         mergedOpts["@" + i] = JSON.stringify(loadOptions[i]);
//       }
//     });

//     mergedOpts["schema"] = "get";

//     return sendRequest(urlFromPages, mergedOpts).then((response) => {
//       if (loadOptions.requireTotalCount === true) {
//         return {
//           data: response.data,
//           totalCount: response.totalCount,
//         };
//       } else {
//         return response;
//       }
//     });
//   },
// });
