import translationWords from "@/langs/translationWords";

// Replace string
const replaceAll = (text, search, replacement) => {
  return text.replace(new RegExp(search, "g"), replacement);
};

// Translation
export function __(string, siteLang = "tr", params = {}) {
  let found = "";

  switch (siteLang) {
    case "en":
      found = translationWords["en"][string];
      break;
    case "de":
      found = translationWords["de"][string];
      break;
    case "fr":
      found = translationWords["fr"][string];
      break;
    case "es":
      found = translationWords["es"][string];
      break;
    case "eus":
      found = translationWords["eus"][string];
      break;
    case "gal":
      found = translationWords["gal"][string];
      break;
    case "it":
      found = translationWords["it"][string];
      break;
    case "pt":
      found = translationWords["pt"][string];
      break;
    case "ru":
      found = translationWords["ru"][string];
      break;
    case "se":
      found = translationWords["se"][string];
      break;
  }

  if (found !== undefined && found !== "") {
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
