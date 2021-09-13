import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

import {StatusLangToggler} from "../components/StatusLangToggler/StatusLangToggler";

const url = "https://10.0.10.71";
const baseParams = "/actions.asp?operation=do";
// const errorTestParam = "w_testDepthiRiseErrors"; // API for error test

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
    keyType = "@id",
    byKeyType = "@key"
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
            [byKeyType]: key,
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
    "@jvalues",
    "@gid"
  );

  const changeMyLocalToData = new CustomStore({
    key: "short",
    update: (newKey) =>
      sendRequest(urlFromPages, {schema: "dbo", "@newkey": newKey}, "POST"),
  });

  const custumMessageData = new CustomStore({
    key: "id",
    // loadMode: "row",
    load: () => {
      return sendRequest(urlFromPages, {schema: "get"}, "POST");
    },
  });

  //   const fetchData = new CustomStore({
  //   key: "id",
  //   load: () => sendRequest(finalUrl, {schema: "get"}),
  //   insert: (values) =>
  //     sendRequest(
  //       finalUrl,
  //       {
  //         schema: "ins",
  //         // values: StatusLangToggler().statusStringToBoolean(values),
  //         values: JSON.stringify(values),
  //       },
  //       "POST"
  //     ),
  //   update: (key, values) =>
  //     sendRequest(
  //       finalUrl,
  //       {
  //         schema: "upd",
  //         "@id": key,
  //         // values: StatusLangToggler().statusStringToBoolean(values),
  //         values: JSON.stringify(values),
  //       },
  //       "POST"
  //     ),
  //   remove: (key) =>
  //     sendRequest(
  //       finalUrl,
  //       {
  //         schema: "del",
  //         "@id": key,
  //       },
  //       "POST"
  //     ),
  //   byKey: (key) =>
  //     sendRequest(
  //       finalUrl,
  //       {
  //         schema: "bykey",
  //         "@key": key,
  //       },
  //       "POST"
  //     ),
  //   onBeforeSend: function (method, ajaxOptions) {
  //     ajaxOptions.credentials = "include";
  //     ajaxOptions.xhrFields = {withCredentials: true};
  //   },
  // });

  // ========================================

  // const fetchColumnsSchemaData = new CustomStore({
  //   key: "id",
  //   load: () => sendRequest(urlFromPages, {schema: "get"}),
  //   insert: (values) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "ins",
  //         // values: StatusLangToggler().statusStringToBoolean(values),
  //         values: JSON.stringify(values),
  //       },
  //       "POST"
  //     ),
  //   update: (key, values) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "upd",
  //         "@id": key,
  //         // values: StatusLangToggler().statusStringToBoolean(values),
  //         values: JSON.stringify(values),
  //       },
  //       "POST"
  //     ),
  //   remove: (key) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "del",
  //         "@id": key,
  //       },
  //       "POST"
  //     ),
  //   byKey: (key) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "bykey",
  //         "@key": key,
  //       },
  //       "POST"
  //     ),
  //   onBeforeSend: function (method, ajaxOptions) {
  //     ajaxOptions.credentials = "include";
  //     ajaxOptions.xhrFields = {withCredentials: true};
  //   },
  // });

  // const usersFetchData = new CustomStore({
  //   key: "GID",
  //   load: () =>
  //     sendRequest(urlFromPages, {
  //       schema: "get",
  //     }),
  //   insert: (values) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "ins",
  //         // "@jvalues": StatusLangToggler().statusStringToBoolean(values),
  //         "@jvalues": JSON.stringify(values),
  //       },
  //       "POST"
  //     ),
  //   update: (key, values) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "upd",
  //         "@gid": key,
  //         // "@jvalues": StatusLangToggler().statusStringToBoolean(values),
  //         "@jvalues": JSON.stringify(values),
  //       },
  //       "POST"
  //     ),
  //   remove: (key) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "del",
  //         "@gid": key,
  //       },
  //       "POST"
  //     ),
  //   onBeforeSend: function (method, ajaxOptions) {
  //     ajaxOptions.credentials = "include";
  //     ajaxOptions.xhrFields = {withCredentials: true};
  //   },
  // });

  // const personFetchData = new CustomStore({
  //   key: "oid",
  //   load: () =>
  //     sendRequest(urlFromPages, {
  //       schema: "get",
  //     }),
  //   insert: (values) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "ins",
  //         // "@jvalues": StatusLangToggler().statusStringToBoolean(values),
  //         "@jvalues": JSON.stringify(values),
  //       },
  //       "POST"
  //     ),
  //   update: (key, values) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "upd",
  //         "@oid": key,
  //         // "@jvalues": StatusLangToggler().statusStringToBoolean(values),
  //         "@jvalues": JSON.stringify(values),
  //       },
  //       "POST"
  //     ),
  //   remove: (key) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "del",
  //         "@oid": key,
  //       },
  //       "POST"
  //     ),
  //   onBeforeSend: function (method, ajaxOptions) {
  //     ajaxOptions.credentials = "include";
  //     ajaxOptions.xhrFields = {withCredentials: true};
  //   },
  // });

  // const lookData = {
  //   // ?experement with this article => https://js.devexpress.com/Documentation/Guide/UI_Components/TreeList/How_To/Bind_a_Lookup_Column_to_a_Custom_Data_Source/

  //   store: new CustomStore({
  //     key: "id",
  //     loadMode: "raw",
  //     load: (loadOptions) => {
  //       console.log(`loadOptions`, loadOptions);

  //       let params = "";
  //       [
  //         "skip",
  //         "take",
  //       ].forEach(function (i) {
  //         if (i in loadOptions && isNotEmpty(loadOptions[i])) {
  //           params += `&@${i}=${JSON.stringify(loadOptions[i])}`;
  //         }
  //       });

  //       return sendRequest(
  //         // `${url}${baseParams}${pageRequestParams()}&@skip=0&@take=10`,
  //         `${url}${baseParams}${pageRequestParams()}${params}`,
  //         // `${url}${baseParams}${pageRequestParams()}`,
  //         {
  //           schema: "look",
  //         }
  //       );
  //     },
  //     byKey: (key) => {
  //        return fetch(`${url}${baseParams}${pageRequestParams()}${key}`);
  //     },
  //   }),
  //   take: 10,
  //   skip: 0,
  //   paginate: true,
  //   pageSize: 10,
  // };

  // const lookupDataSource = new DataSource({
  //   store: lookData,
  //   paginate: true,
  //   pageSize: 10,
  // });

  const lookData = new CustomStore({
    key: "id",
    load: () => {
      return sendRequest(urlFromPages, {
        schema: "look",
      });
    },
  });

  // const detailUserTemplateData = new CustomStore({
  //   key: "RGID",
  //   load: () =>
  //     sendRequest(urlFromPages, {
  //       schema: "get",
  //     }),
  //   insert: (values) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "ins",
  //         // "@jvalues": StatusLangToggler().statusStringToBoolean(values),
  //         "@jvalues": JSON.stringify(values),
  //       },
  //       "POST"
  //     ),
  //   update: (key, values) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "upd",
  //         "@gid": key,
  //         // "@jvalues": StatusLangToggler().statusStringToBoolean(values),
  //         "@jvalues": JSON.stringify(values),
  //       },
  //       "POST"
  //     ),
  //   remove: (key) =>
  //     sendRequest(
  //       urlFromPages,
  //       {
  //         schema: "del",
  //         "@gid": key,
  //       },
  //       "POST"
  //     ),
  //   onBeforeSend: function (method, ajaxOptions) {
  //     ajaxOptions.credentials = "include";
  //     ajaxOptions.xhrFields = {withCredentials: true};
  //   },
  // });

  async function sendRequest(url, data = {}, method = "GET") {
    const params = Object.keys(data)
      .map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
      })
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

// *** async function responseData with cheking staus field into data ***
// let newData = null;

// if (Array.isArray(data)) {
//   data[0].status
//     ? (newData = StatusLangToggler().statusBooleanToString(data))
//     : (newData = data);

//   return {
//     data: newData,
//     totalCount: newData.length,
//   };
// }
