import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

const url = "http://10.0.10.71";
const baseParams = "/actions.asp?db=hbdb&operation=do";

export const sooguData = (pageRequest) => {
  console.log("pageRequest", pageRequest);
  const pageRequestParams = () => {
    switch (pageRequest) {
      case "#/soogu":
        return "&sp=Soogu";
      case "#/soato":
        return "&sp=Soato";
      case "#/countries":
        return "&sp=Countries";
      default:
        return "#/home";
    }
  };

  return new CustomStore({
    key: "id",
    load: () =>
      sendRequest(`${url}${baseParams}${pageRequestParams()}`, {
        schema: "get",
      }),
    insert: (values) =>
      sendRequest(
        `${url}${baseParams}`,
        {
          schema: "ins",
          values: statusStringToBoolean(values),
        },
        "POST"
      ),
    update: (key, values) =>
      sendRequest(
        `${url}${baseParams}`,
        {
          schema: "upd",
          "@id": key,
          values: statusStringToBoolean(values),
        },
        "POST"
      ),
    remove: (key) =>
      sendRequest(
        `${url}${baseParams}`,
        {
          schema: "del",
          "@id": key,
        },
        "POST"
      ),
  });
};

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
        console.log("json", response);
        return response
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
      console.log("text", response);
      return response
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
      status: values.status === "Active" ? true : false,
    };
  }

  console.log(`newStatus => `, newStatus);
  return JSON.stringify(newStatus);
}

function statusBooleanToString(data) {
  return data.map((item) => {
    if (typeof item.status === "boolean") {
      const changeStatus = {
        ...item,
        status: item.status ? "Active" : "Deactivated",
      };

      return changeStatus;
    }

    return item;
  });
}

function responseData(data) {
  if (Array.isArray(data)) {
    const newData = statusBooleanToString(data);
    console.log(`newData => `, newData);

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

// export {sooguData};