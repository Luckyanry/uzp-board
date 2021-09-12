import {formatMessage} from "devextreme/localization";

const StatusLangToggler = () => {
  function statusToggler() {
    const defaultStatus = ["msgStatusActive", "msgStatusDeactivated"];
    const statusLanguage = defaultStatus.map((statusLang) =>
      formatMessage(statusLang)
    );
    return statusLanguage;
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
      if (typeof item.status === "boolean") {
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

  return {statusToggler, statusStringToBoolean, statusBooleanToString};
};

export {StatusLangToggler};
