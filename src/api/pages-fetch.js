import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";
import {useLocalization} from "../contexts/LocalizationContext";
// import DataSource from "devextreme/data/data_source";

const url = "http://10.0.10.71";
const baseParams = "/actions.asp?db=hbdb&operation=do";

export const FetchData = (pageRequest) => {
  const {formatMessage} = useLocalization();

  const pageRequestParams = () => {
    switch (pageRequest) {
      case "/soogu":
        return "&sp=Soogu";
      case "/soato":
        return "&sp=Soato";
      case "/countries":
        return "&sp=Countries";
      case "/kopf":
        return "&sp=Kopf";
      case "/kfs":
        return "&sp=KFS";
      case "/kspd":
        return "&sp=Kspd";
      case "/shortDics":
        return "&sp=ShortDics";
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
      // console.log("lookData =>", newData);
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

  return {fetchData, lookData};
};
