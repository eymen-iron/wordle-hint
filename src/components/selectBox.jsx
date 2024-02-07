export default function SelectLanguage({ data, lang, setLang, className }) {
  let langSet = [];
  langSet["tr"] = "Türkçe";
  langSet["en"] = "English";
  langSet["de"] = "Deutsch";
  langSet["fr"] = "Français";
  langSet["es"] = "Español";
  langSet["it"] = "Italiano";
  langSet["pt"] = "Português";
  langSet["ru"] = "Русский";
  langSet["se"] = "Svenska";
  langSet["gal"] = "Galego";
  langSet["eus"] = "Euskara";

  return (
    <select
      name="lang"
      className="lg:w-full w-[130px] mr-4 lg:mr-0 border-none bg-transparent text-red-500 outline-none" 
      onChange={(e) => setLang(e.target.value)}
      value={lang}
    >
      {Object.keys(data).map((item, index) => {
        return (
          <option key={index} value={item}>
            {langSet[item]}
          </option>
        );
      })}
    </select>
  );
}
