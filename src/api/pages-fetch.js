import CustomStore from "devextreme/data/custom_store";
// import DataSource from "devextreme/data/data_source";
import "whatwg-fetch";

const url = "https://10.0.10.71";
const baseParams = "/actions.asp?operation=do";
const hbdbParam = "db=hbdb";
const wisdbParam = "db=wisdb";
// const errorTestParam = "w_testDepthiRiseErrors";

export const FetchData = (
  pageRequest,
  formatMessage,
  tid = null,
  sp = null,
  db = "hbdb"
) => {
  const pageRequestParams = () => {
    switch (pageRequest) {
      case "/soogu":
        return `&${hbdbParam}&sp=Soogu`;
      // case "/soato":
      //   return `&${hbdbParam}&sp=Soato`;
      // case "/countries":
      //   return `&${hbdbParam}&sp=Countries`;
      case "/countries":
        return `&${hbdbParam}&sp=ShortDicsRecordsFlat&@name=CountriesColumnSchema`;
      case "/kopf":
        return `&${hbdbParam}&sp=ShortDicsRecordsFlat&@name=KopfColumnSchema`;
      // case "/kfs":
      //   return `&${hbdbParam}&sp=KFS`;
      // case "/kspd":
      //   return `&${hbdbParam}&sp=Kspd`;
      case "/ShortDics":
        return `&${hbdbParam}&sp=ShortDics`;
      case "/oked":
        return `&${hbdbParam}&sp=ShortDicsRecordsFlat&@name=OkedSchema`;
      case "/mihalla":
        return `&${hbdbParam}&sp=ShortDicsRecordsFlat&@name=MihallaColumnSchema`;
      case "/ShortDicsRecords":
        return `&${hbdbParam}&sp=ShortDicsRecords&@tid=${tid}`;
      case "/DictionaryByName":
        return `&${hbdbParam}&sp=ShortDicsRecords&@name=PasswordPolicies`;
      case "/CustomMessages":
        return `&${hbdbParam}&sp=ShortDicsRecordsFlatCustomMessagesObject`;
      // case "/islang":
      //   return `&${wisdbParam}&sp=Islang`;
      // case "/w_changeMyLocaleTo":
      //   return `&${wisdbParam}&sp=W_changeMyLocaleTo`;
      case "/usersList":
        return `&${wisdbParam}&sp=UserObjects`;
      case "/usersRole":
        return `&${wisdbParam}&sp=RoleObjects`;
      case "/usersGroup":
        return `&${wisdbParam}&sp=GroupObjects`;
      default:
        return "/home";
    }
  };

  const finalUrl = `${url}${baseParams}${pageRequestParams()}`;

  const fetchData = new CustomStore({
    key: "id",
    load: () => sendRequest(finalUrl, {schema: "get"}),
    insert: (values) =>
      sendRequest(
        finalUrl,
        {
          schema: "ins",
          values: statusStringToBoolean(values),
        },
        "POST"
      ),
    update: (key, values) =>
      sendRequest(
        finalUrl,
        {
          schema: "upd",
          "@id": key,
          values: statusStringToBoolean(values),
        },
        "POST"
      ),
    remove: (key) =>
      sendRequest(
        finalUrl,
        {
          schema: "del",
          "@id": key,
        },
        "POST"
      ),
    byKey: (key) =>
      sendRequest(
        finalUrl,
        {
          schema: "bykey",
          "@key": key,
        },
        "POST"
      ),
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.credentials = "include";
      ajaxOptions.xhrFields = {withCredentials: true};
    },
  });

  const urlFromPages = `${url}${baseParams}&db=${db}&sp=${sp}`;

  const fetchColumnsSchemaData = new CustomStore({
    key: "id",
    load: () => sendRequest(urlFromPages, {schema: "get"}),
    insert: (values) =>
      sendRequest(
        urlFromPages,
        {
          schema: "ins",
          values: statusStringToBoolean(values),
        },
        "POST"
      ),
    update: (key, values) =>
      sendRequest(
        urlFromPages,
        {
          schema: "upd",
          "@id": key,
          values: statusStringToBoolean(values),
        },
        "POST"
      ),
    remove: (key) =>
      sendRequest(
        urlFromPages,
        {
          schema: "del",
          "@id": key,
        },
        "POST"
      ),
    byKey: (key) =>
      sendRequest(
        urlFromPages,
        {
          schema: "bykey",
          "@key": key,
        },
        "POST"
      ),
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.credentials = "include";
      ajaxOptions.xhrFields = {withCredentials: true};
    },
  });

  const usersFetchData = new CustomStore({
    key: "GID",
    load: () =>
      sendRequest(finalUrl, {
        schema: "get",
      }),
    insert: (values) =>
      sendRequest(
        finalUrl,
        {
          schema: "ins",
          "@jvalues": statusStringToBoolean(values),
        },
        "POST"
      ),
    update: (key, values) =>
      sendRequest(
        finalUrl,
        {
          schema: "upd",
          "@guid": key,
          "@jvalues": statusStringToBoolean(values),
        },
        "POST"
      ),
    remove: (key) =>
      sendRequest(
        finalUrl,
        {
          schema: "del",
          "@guid": key,
        },
        "POST"
      ),
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.credentials = "include";
      ajaxOptions.xhrFields = {withCredentials: true};
    },
  });

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

  const changeMyLocalToData = new CustomStore({
    key: "short",
    insert: (newKey) =>
      sendRequest(urlFromPages, {schema: "dbo", "@newkey": newKey}, "POST"),
  });

  const custumMessageData = new CustomStore({
    key: "id",
    // loadMode: "row",
    load: () => {
      return sendRequest(finalUrl, {schema: "get"}, "POST");
    },
  });

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

  function statusStringToBoolean(values) {
    let newStatus = values;

    if (values.status) {
      newStatus = {
        ...values,
        status:
          values.status === formatMessage("msgStatusActive") ? true : false,
      };
    }

    return JSON.stringify(newStatus);
  }

  function statusBooleanToString(data) {
    return data.map((item) => {
      if (item.status && typeof item.status === "boolean") {
        const changeStatus = {
          ...item,
          status: item.status
            ? formatMessage("msgStatusActive")
            : formatMessage("msgStatusDeactivated"),
        };

        return changeStatus;
      }

      return item;
    });
  }

  function responseData(data) {
    let newData = null;

    if (Array.isArray(data)) {
      if (data[0].status) {
        newData = statusBooleanToString(data);
      } else {
        newData = data;
      }

      return {
        data: newData,
        totalCount: newData.length,
      };
    }

    // if (!JSON.parse(data).hint) {
    //   return data && JSON.parse(data);
    // }

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
      // throw data;
    }
  }

  return {
    fetchColumnsSchemaData,
    fetchData,
    lookData,
    changeMyLocalToData,
    usersFetchData,
    custumMessageData,
    // lookupDataSource,
  };
};

// function isNotEmpty(value) {
//   return value !== undefined && value !== null && value !== "";
// }
