import translationWords from "@/langs/translationWords";

export function __(string, siteLang = "tr", params = {}) {
  const found = translationWords[siteLang]?.[string];

  if (found) {
    return __parse(found, params);
  }

  return __parse(string, params);
}

export function __parse(string, params = {}) {
  const length = Object.keys(params).length;

  if (length > 0) {
    Object.keys(params).forEach((key) => {
      const value = params[key];

      if (key !== "" && value !== "") {
        string = replaceAll(string, "{" + key + "}", value);
      }
    });
  }

  return string;
}
