"use client";

import data from "@/langs";
import Aside from "./aside";
import { useEffect, useState, useRef, useCallback } from "react";
import Filters from "@/components/filters";
import SelectLanguage from "./selectBox";
import { __ } from "@/utils/translation";

const PageRoot = () => {
  const boxRef = useRef();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [arr, setArr] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [toast, setToast] = useState({ word: null, id: 0 });
  const toastTimeout = useRef(null);
  const [metaVal, setMetaVal] = useState([
    { preference: "include_word", value: "" },
    { preference: "exclude_word", value: "" },
    { preference: "first_letter", value: "" },
    { preference: "second_letter", value: "" },
    { preference: "third_letter", value: "" },
    { preference: "fourth_letter", value: "" },
    { preference: "fifth_letter", value: "" },
    { preference: "not_first_letter", value: "" },
    { preference: "not_second_letter", value: "" },
    { preference: "not_third_letter", value: "" },
    { preference: "not_fourth_letter", value: "" },
    { preference: "not_fifth_letter", value: "" },
  ]);

  const totalWords = data[selectedLanguage]?.length || 0;
  const hasActiveFilter = metaVal.some((item) => item.value.length > 0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lang = localStorage.getItem("lang");
      if (lang && lang !== selectedLanguage) {
        setSelectedLanguage(lang);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", selectedLanguage.toString());
      if (
        data[selectedLanguage.toString()] !== undefined &&
        data[selectedLanguage.toString()].length > 0
      ) {
        setArr(data[selectedLanguage.toString()]);
      } else {
        setSelectedLanguage("en");
        setArr(data[selectedLanguage.toString()]);
      }
    }
  }, [selectedLanguage]);

  useEffect(() => {
    let filteredArr = data[selectedLanguage];
    const posMap = {
      first_letter: 0,
      second_letter: 1,
      third_letter: 2,
      fourth_letter: 3,
      fifth_letter: 4,
    };

    metaVal.forEach((item) => {
      if (item.value.length === 0) return;
      const val = item.value.toLowerCase();

      if (item.preference === "include_word") {
        val.split("").forEach((letter) => {
          filteredArr = filteredArr.filter((word) =>
            word.toLowerCase().includes(letter),
          );
        });
      } else if (item.preference === "exclude_word") {
        val.split("").forEach((letter) => {
          filteredArr = filteredArr.filter(
            (word) => !word.toLowerCase().includes(letter),
          );
        });
      } else if (posMap[item.preference] !== undefined) {
        const idx = posMap[item.preference];
        filteredArr = filteredArr.filter(
          (word) => word[idx]?.toLowerCase() === val,
        );
      } else if (item.preference.startsWith("not_")) {
        const posKey = item.preference.replace("not_", "");
        const idx = posMap[posKey];
        if (idx !== undefined) {
          const excluded = val.split("");
          filteredArr = filteredArr.filter(
            (word) => !excluded.includes(word[idx]?.toLowerCase()),
          );
        }
      }
    });
    setArr(filteredArr);
  }, [metaVal]);

  const handleLetter = (e) => {
    e.preventDefault();
    const val = e.target.value;
    const id = e.target.id;
    setMetaVal(
      metaVal.map((item) =>
        item.preference === id ? { ...item, value: val } : item,
      ),
    );
  };

  const handleReset = useCallback(() => {
    setMetaVal((prev) => prev.map((item) => ({ ...item, value: "" })));
    document.querySelectorAll(".form__field").forEach((input) => {
      input.value = "";
    });
  }, []);

  const copyWord = (word) => {
    navigator.clipboard
      .writeText(word)
      .then(() => {
        if (toastTimeout.current) clearTimeout(toastTimeout.current);
        setToast((prev) => ({ word, id: prev.id + 1 }));
        toastTimeout.current = setTimeout(
          () => setToast((prev) => ({ ...prev, word: null })),
          1500,
        );
      })
      .catch((err) => console.error("error", err));
  };

  useEffect(() => {
    const box = boxRef.current.querySelector("[data_table]");
    const handleClick = (e) => {
      if (!box.contains(e.target)) {
        setHidden(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [boxRef]);

  return (
    <main className="relative mx-auto h-screen max-w-[1400px]">
      {/* Toast */}
      {toast.word && (
        <div
          key={toast.id}
          className="toast fixed bottom-6 left-1/2 z-[100] rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-pink-600/20"
        >
          &ldquo;{toast.word}&rdquo; copied!
        </div>
      )}

      <section className="flex h-screen w-full flex-col items-start lg:flex-row">
        {/* Mobile Header */}
        <div className="flex w-full items-center justify-between border-b border-[#2a2a3e] p-3 lg:hidden">
          <h1 className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            Wordle Hint
          </h1>
          <div className="flex items-center gap-2">
            <SelectLanguage
              data={data}
              setLang={setSelectedLanguage}
              lang={selectedLanguage}
            />
            <button
              className="rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              onClick={() => setHidden(!hidden)}
            >
              {__("Filtrele", selectedLanguage)}
            </button>
          </div>
          <div
            ref={boxRef}
            className={
              "fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm" +
              (hidden ? " flex" : " hidden")
            }
          >
            <div
              className="relative mx-4 flex w-full max-w-[320px] flex-col items-center rounded-2xl border border-[#2a2a3e] bg-[#12121a] p-6"
              data_table="filter-inputs"
            >
              <button
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#2a2a3e] transition-colors hover:bg-pink-900"
                onClick={() => setHidden(!hidden)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path
                    d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                    fill="rgba(255,255,255,1)"
                  />
                </svg>
              </button>
              <Filters lang={selectedLanguage} handle={handleLetter} />
              {hasActiveFilter && (
                <button
                  onClick={handleReset}
                  className="mt-3 w-full rounded-lg border border-[#2a2a3e] py-1.5 text-sm text-gray-400 transition-colors hover:border-pink-800 hover:text-white"
                >
                  {__("Temizle", selectedLanguage)}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <Aside
          setLang={setSelectedLanguage}
          lang={selectedLanguage}
          data={data}
          handle={handleLetter}
          onReset={handleReset}
          hasActiveFilter={hasActiveFilter}
        />

        {/* Word Grid */}
        <div className="flex w-full flex-1 flex-col overflow-hidden lg:w-[calc(100%-280px)]">
          {/* Header bar */}
          <div className="hidden items-center justify-between border-b border-[#2a2a3e] px-5 py-3 lg:flex">
            <h1 className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-xl font-bold tracking-tight text-transparent">
              Wordle Hint
            </h1>
            <span className="rounded-full bg-[#1a1a2e] px-3 py-1 text-xs text-gray-400">
              {arr.length}
              {hasActiveFilter && ` / ${totalWords}`} {arr.length === 1 ? "word" : "words"}
            </span>
          </div>

          {/* Mobile result count */}
          <div className="flex items-center justify-between px-4 py-2 lg:hidden">
            <span className="text-xs text-gray-500">
              {arr.length}
              {hasActiveFilter && ` / ${totalWords}`} {arr.length === 1 ? "word" : "words"}
            </span>
          </div>

          {/* Words */}
          <div className="flex-1 overflow-y-auto p-4">
            {arr.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-3 h-10 w-10 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-sm">No words found</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {arr.map((word) => (
                  <button
                    key={word}
                    type="button"
                    className="rounded-lg border border-[#2a2a3e] bg-[#12121a] px-3 py-1.5 text-sm font-medium tracking-wider text-gray-300 transition-all duration-200 hover:border-pink-700 hover:bg-pink-950/40 hover:text-white active:scale-95"
                    onClick={() => copyWord(word)}
                  >
                    {word}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PageRoot;
