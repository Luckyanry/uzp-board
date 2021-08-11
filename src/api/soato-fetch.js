import CustomStore from "devextreme/data/custom_store";

const url = "http://10.0.10.71";
const baseParams = "/actions.asp?sp=Soato&db=hbdb&operation=do";

const soatoData = new CustomStore({
  key: "id",
  load: () =>
    sendRequest(`${url}${baseParams}`, {
      schema: "get",
    }),
  insert: (values) =>
    sendRequest(
      `${url}${baseParams}`,
      {
        schema: "ins",
        values: JSON.stringify(values),
      },
      "POST"
    ),
  update: (key, values) =>
    sendRequest(
      `${url}${baseParams}`,
      {
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
        schema: "del",
        "@id": key,
      },
      "POST"
    ),
});

const soatoLookData = new CustomStore({
  key: "pid",
  insert: (values) =>
    sendRequest(
      `${url}${baseParams}`,
      {
        schema: "look",
        values: JSON.stringify(values),
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
  console.log("params", params);

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

export {soatoData, soatoLookData};

console.log("soatoData", soatoData);
console.log("soatoLookData", soatoLookData);
