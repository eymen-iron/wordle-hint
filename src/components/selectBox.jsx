export default function SelectLanguage({ data, lang, setLang }) {
  const langSet = {
    tr: "Turkce",
    en: "English",
    de: "Deutsch",
    fr: "Francais",
    es: "Espanol",
    it: "Italiano",
    pt: "Portugues",
    ru: "Russkiy",
    se: "Svenska",
    gal: "Galego",
    eus: "Euskara",
  };

  return (
    <select
      name="lang"
      className="w-full cursor-pointer rounded-lg border border-[#2a2a3e] bg-[#12121a] px-3 py-2 text-sm text-gray-300 outline-none transition-colors hover:border-pink-800 focus:border-pink-600"
      onChange={(e) => setLang(e.target.value)}
      value={lang}
    >
      {Object.keys(data).map((item) => (
        <option key={item} value={item}>
          {langSet[item]}
        </option>
      ))}
    </select>
  );
}
