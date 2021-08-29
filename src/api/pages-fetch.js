import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

const url = "https://10.0.10.71";
const baseParams = "/actions.asp?operation=do";
const hbdbParam = "db=hbdb";
const wisdbParam = "db=wisdb";

export const FetchData = (pageRequest, formatMessage, tid = null) => {
  const pageRequestParams = () => {
    switch (pageRequest) {
      case "/soogu":
        return `&${hbdbParam}&sp=Soogu`;
      case "/soato":
        return `&${hbdbParam}&sp=Soato`;
      case "/countries":
        return `&${hbdbParam}&sp=Countries`;
      case "/kopf":
        return `&${hbdbParam}&sp=Kopf`;
      case "/kfs":
        return `&${hbdbParam}&sp=KFS`;
      case "/kspd":
        return `&${hbdbParam}&sp=Kspd`;
      case "/oked":
        return `&${hbdbParam}&sp=Oked`;
      case "/ShortDics":
        return `&${hbdbParam}&sp=ShortDics`;
      case "/ShortDicsRecords":
        return `&${hbdbParam}&sp=ShortDicsRecords&@tid=${tid}`;
      case "/DictionaryByName":
        return `&${hbdbParam}&sp=ShortDicsRecords&@name=PasswordPolicies`;
      case "/islang":
        return `&${wisdbParam}&sp=islang`;
      case "/w_changeMyLocaleTo":
        return `&${wisdbParam}&sp=w_changeMyLocaleTo`;
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
    load: () =>
      sendRequest(finalUrl, {
        schema: "get",
      }),
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

  const lookData = new CustomStore({
    key: "id",
    load: () =>
      sendRequest(`${url}${baseParams}${pageRequestParams()}`, {
        schema: "look",
      }),
  });

  const changeMyLocalToData = new CustomStore({
    key: "short",
    insert: (newKey) =>
      sendRequest(
        `${url}${baseParams}${pageRequestParams()}`,
        {
          schema: "dbo",
          "@newkey": newKey,
        },
        "POST"
      ),
  });

  async function sendRequest(url, data = {}, method = "GET") {
    const params = Object.keys(data)
      .map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
      })
      .join("&");

    const getOptions = {
      method,
      credentials: "include",
      xhrFields: {withCredentials: true},
    };

    const postOptions = {
      method,
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      credentials: "include",
      xhrFields: {withCredentials: true},
    };

    if (method === "GET") {
      try {
        const response = await fetch(`${url}&${params}`, getOptions);

        if (response.ok) {
          return await response
            .json()
            .then((data) => responseData(data))
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
          .then((data) => responseData(data))
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
        status: values.status === formatMessage("Active") ? true : false,
      };
    }

    return JSON.stringify(newStatus);
  }

  function statusBooleanToString(data) {
    return data.map((item) => {
      if (typeof item.status === "boolean") {
        const changeStatus = {
          ...item,
          status: item.status
            ? formatMessage("Active")
            : formatMessage("Deactivated"),
        };

        return changeStatus;
      }

      return item;
    });
  }

  function responseData(data) {
    if (Array.isArray(data)) {
      const newData = statusBooleanToString(data);

      return {
        data: newData,
        totalCount: newData.length,
      };
    }
    if (!JSON.parse(data).hint) {
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

  return {fetchData, lookData, changeMyLocalToData, usersFetchData};
};
