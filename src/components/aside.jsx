"use client";

import Filters from "@/components/filters";
import SelectLanguage from "./selectBox";
import { __ } from "@/utils/translation";

const Aside = ({ handle, data, setLang, lang, onReset, hasActiveFilter }) => {
  return (
    <aside className="hidden h-screen w-[280px] flex-shrink-0 flex-col border-r border-[#2a2a3e] bg-[#0d0d14] lg:flex">
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <Filters handle={handle} lang={lang} />
        {hasActiveFilter && (
          <button
            onClick={onReset}
            className="mt-4 w-full rounded-lg border border-[#2a2a3e] py-2 text-sm text-gray-400 transition-colors hover:border-pink-800 hover:text-white"
          >
            {__("Temizle", lang)}
          </button>
        )}
      </div>
      <div className="border-t border-[#2a2a3e] px-5 py-4">
        <SelectLanguage setLang={setLang} lang={lang} data={data} />
        <a
          href="https://github.com/eymen-iron"
          target="_blank"
          className="mt-2 block text-xs text-gray-500 transition-colors hover:text-purple-400"
        >
          @simeon_eymen
        </a>
      </div>
    </aside>
  );
};

export default Aside;
