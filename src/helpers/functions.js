function checkIfArrIncludesValue(arr, value) {
  return arr.includes(value);
}

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

function firstLetterToUpper(message) {
  return `${message[0].toUpperCase()}${message.slice(1)}`;
}

function createCustomMsg(message) {
  return `msg${firstLetterToUpper(message)}`;
}

function customPageAbbreviationMsg(message) {
  return `msg${firstLetterToUpper(message)}Abbreviation`;
}

function getFromSessionStorege(key, ifIsNull) {
  const store = JSON.parse(sessionStorage.getItem(key));
  return store !== null ? store : ifIsNull;
}

function setToSessionStorege(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getLookupParamsForURL(data) {
  const findLookup = data.filter(({lookup}) => lookup);

  if (!findLookup) return;

  const result = findLookup.map(({lookup, dataField}) => {
    const getDBFormLookup = lookup.isfetch.split(".")[0];
    const getSpFormLookup = lookup.isfetch.split(".")[2];

    return {sp: getSpFormLookup, db: getDBFormLookup, dataField};
  });

  return result;
}

export {
  checkIfArrIncludesValue,
  isNotEmpty,
  firstLetterToUpper,
  createCustomMsg,
  customPageAbbreviationMsg,
  getFromSessionStorege,
  setToSessionStorege,
  getLookupParamsForURL,
};
