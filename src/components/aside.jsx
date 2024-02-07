"use client";

import Filters from "@/components/filters";
import SelectLanguage from "./selectBox";

const Aside = ({ handle, data, setLang, lang }) => {
  return (
    <aside className="hidden h-screen w-[280px] flex-col gap-3 border-r-2 border-[#db2777] py-4 pr-2 lg:flex">
      <Filters handle={handle} lang={lang} />
      <div className="relative mt-auto w-full">
        <a
          href="https://www.instagram.com/simeon_eymen"
          target="_blank"
          className="text-start text-purple-400"
        >
          @simeon_eymen
        </a>
        <SelectLanguage setLang={setLang} lang={lang} data={data} />
      </div>
    </aside>
  );
};

export default Aside;
