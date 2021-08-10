import CustomStore from "devextreme/data/custom_store";

const url = "http://10.0.10.71";
const baseParams = "/actions.asp?sp=Countries&db=hbdb";

const countriesStore = new CustomStore({
  key: "id",
  load: () =>
    sendRequest(`${url}${baseParams}`, {
      operation: "load",
      schema: "get",
    }),
  insert: (values) =>
    sendRequest(
      `${url}${baseParams}`,
      {
        operation: "insert",
        schema: "ins",
        values: JSON.stringify(values),
      },
      "POST"
    ),
  update: (key, values) =>
    sendRequest(
      `${url}${baseParams}`,
      {
        operation: "update",
        schema: "upd",
        "@id": key,
        values: JSON.stringify(values),
      },
      "POST"
    ),
  remove: (key) =>
    sendRequest(
      `${url}${baseParams}`,
      {
        operation: "insert",
        schema: "del",
        "@id": key,
      },
      "POST"
    ),
});

function sendRequest(url, data = {}, method = "GET") {
  const params = Object.keys(data)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
    })
    .join("&");

  if (method === "GET") {
    return fetch(`${url}&${params}`, {
      method,
      credentials: "include",
      xhrFields: {withCredentials: true},
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          return {
            data,
            totalCount: data.length,
          };
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
      })
      .catch((err) => {
        console.error("GET Response Data", err);
        throw new Error(err);
      });
  }

  return fetch(url, {
    method,
    body: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    credentials: "include",
    xhrFields: {withCredentials: true},
  })
    .then((response) => {
      if (response.ok) return response.text();
    })
    .then((text) => {
      let json = JSON.parse(text);
      console.log("fetchJSON", json);

      if (!json.hint) {
        return text && JSON.parse(text);
      } else {
        throw new Error(
          `
            ScriptFile: ${json.ScriptFile},
            Description: ${json.VBErr.Description}, 
            Error Number: ${json.VBErr.Number}, 
            Source: ${json.VBErr.Source}, 
            Hint: ${json.hint}
          `
        );
      }
    })
    .catch((err) => {
      console.error("POST Response Data", err);
      throw new Error(err);
    });
}

export {countriesStore};
