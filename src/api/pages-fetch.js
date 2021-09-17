import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

import {StatusLangToggler} from "../components/StatusLangToggler/StatusLangToggler";
// import {isNotEmpty} from "../helpers/functions";

// const url = "https://uz.is.in.ua";
const url = "https://ea.is.in.ua";
// const url = "https://10.0.10.71";
const baseParams = "/actions.asp?operation=do";
// const errorTestParam = "w_testDepthiRiseErrors"; // API for error test

/*  
  на 10.0.10.71 два сайти 
  https://uz.is.in.ua -- цей через AD-auth
  https://uzapi.is.in.ua -- цей "анонімний", без AD-auth

  на 10.0.10.73 покищо один сайт
  https://ea.is.in.ua  -- "анонімний", без AD-auth
*/

export const FetchData = (pageRequest, sp = null, db = "hbdb") => {
  const pageRequestParams = () => {
    switch (pageRequest) {
      case "/soogu":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=SooguColumnSchema`;
      case "/soato":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=SoatoColumnSchema`;
      case "/countries":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=CountriesColumnSchema`;
      case "/kopf":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=KopfColumnSchema`;
      case "/kfs":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=KfsColumnSchema`;
      case "/kspd":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=KspdColumnSchema`;
      case "/oked":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=OkedSchema`;
      case "/mahalla":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=MahallaColumnSchema`;

      case "/userObjects":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=ISUserAccountColumnSchema`;
      case "/roleObjects":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=ISRoleAccountColumnSchema`;
      case "/groupObjects":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=ISGroupAccountColumnSchema`;

      case "/personObjects":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=PersonObjectColumnSchema`;
      case "/orgUnits":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=OrgUnitObjectColumnSchema`;
      case "/employees":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=EmployeeObjectColumnSchema`;
      case "/legals":
        return `&db=${db}&sp=ShortDicsRecordsFlat&@name=LegalObjectColumnSchema`;

      default:
        return "/home";
    }
  };

  const finalUrl = `${url}${baseParams}${pageRequestParams()}`;
  const urlFromPages = `${url}${baseParams}&sp=${sp}&db=${db}`;

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
      remove: (key) =>
        sendRequest(
          urlType,
          {
            schema: "del",
            [keyType]: key,
          },
          "POST"
        ),
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
        ajaxOptions.xhrFields = {withCredentials: true};
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
    "RGID",
    urlFromPages,
    "values",
    "@gid"
  );

  const changeMyLocalToData = new CustomStore({
    key: "short",
    update: async (newKey) =>
      await sendRequest(
        urlFromPages,
        {schema: "dbo", "@newkey": newKey},
        "POST"
      ),
  });

  const custumMessageData = new CustomStore({
    key: "id",
    // loadMode: "row",
    load: async () => await sendRequest(urlFromPages, {schema: "get"}, "POST"),
  });

  const lookData = {
    store: new CustomStore({
      key: "id",
      loadMode: "raw",
      load: () => sendRequest(urlFromPages, {schema: "look"}),
    }),
    paginate: true,
    pageSize: 20,
  };

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
      xhrFields: {withCredentials: true},
    };

    const postOptions = {
      method,
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      // cache: false,
      credentials: "include",
      xhrFields: {withCredentials: true},
    };

    if (method === "GET") {
      try {
        const response = await fetch(`${url}&${params}`, getOptions);

        if (response.ok) {
          return await response
            .json()
            .then(
              (data) => responseData(data),
              (error) => console.log(`error`, error.message)
            )
            .catch((err) => {
              throw err;
            });
        }
      } catch (err) {
        throw err;
      }
    }

    try {
      const response = await fetch(url, postOptions);
      if (response.ok) {
        return await response
          .text()
          .then(
            (data) => responseData(data),
            (error) => console.log(`error`, error.message)
          )
          .catch((err) => {
            throw err;
          });
      }
    } catch (err) {
      throw err;
    }
  }

  async function responseData(data) {
    let newData = null;

    if (Array.isArray(data)) {
      data[0].status
        ? (newData = StatusLangToggler().statusBooleanToString(data))
        : (newData = data);

      return {
        data: newData,
        totalCount: newData.length,
      };
    }

    if (!data.hint) {
      return data && JSON.parse(data);
    } else {
      throw new Error(
        `
        ScriptFile: ${data.ScriptFile},
        Description: ${data.VBErr.Description},
        Error Number: ${data.VBErr.Number},
        Source: ${data.VBErr.Source},
        Hint: ${data.hint}
      `
      );
    }
  }

  return {
    fetchColumnsSchemaData,
    fetchData,
    lookData,
    changeMyLocalToData,
    usersFetchData,
    custumMessageData,
    personFetchData,
    detailUserTemplateData,
  };
};

// ?experement with this article => https://js.devexpress.com/Documentation/Guide/UI_Components/TreeList/How_To/Bind_a_Lookup_Column_to_a_Custom_Data_Source/

// ======== test lookup ========
// const lookPaginateData = new CustomStore({
//   key: "id",
//   loadMode: "processed",
//   load: async (loadOptions) => {
//     console.log(`loadOptions `, loadOptions);

//     let params = "";

//     ["skip", "take"].forEach(function (i) {
//       if (i in loadOptions && isNotEmpty(loadOptions[i])) {
//         params += `&@${i}=${JSON.stringify(loadOptions[i])}`;
//       }
//     });

//     return await sendRequest(`${urlFromPages}${params}`, {
//       schema: "look",
//     });
//   },
//   byKey: async (key) =>
//     await sendRequest(
//       urlFromPages,
//       {
//         schema: "bykey",
//         "@id": key,
//       },
//       "POST"
//     ),
// });

// const lookData = {
//   store: lookPaginateData,
//   paginate: true,
//   pageSize: 50,

//   // take: 10,
//   // skip: 0,
// };

// ========== Test Lookup on client (working var.) ==========

// const lookDataOnClient = {
//   store: new CustomStore({
//     key: "id",
//     loadMode: "raw",
//     load: async () => {
//       return await fetch(
//         "https://10.0.10.71/actions.asp?operation=do&sp=soato&db=hbdb&schema=look",
//         {
//           credentials: "include",
//           xhrFields: {withCredentials: true},
//         }
//       ).then((response) => response.json());
//     },
//   }),
//   paginate: true,
// };
