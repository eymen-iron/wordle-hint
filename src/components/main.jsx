"use client";

import data from "@/langs";
import Aside from "./aside";
import { useEffect, useState, useRef } from "react";
import Filters from "@/components/filters";
import SelectLanguage from "./selectBox";

const PageRoot = () => {
  const boxRef = useRef();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [arr, setArr] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [metaVal, setMetaVal] = useState([
    {
      preference: "include_word",
      value: "",
    },
    {
      preference: "exclude_word",
      value: "",
    },
    {
      preference: "first_letter",
      value: "",
    },
    {
      preference: "second_letter",
      value: "",
    },
    {
      preference: "third_letter",
      value: "",
    },
    {
      preference: "fourth_letter",
      value: "",
    },
    {
      preference: "fifth_letter",
      value: "",
    },
  ]);

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
      if (data[selectedLanguage.toString()] !== undefined && data[selectedLanguage.toString()].length > 0){
        setArr(data[selectedLanguage.toString()]);
      } else {
        setSelectedLanguage("en");
        setArr(data[selectedLanguage.toString()]);
      }

    }
  }, [selectedLanguage]);


  useEffect(() => {
    let filteredArr = data[selectedLanguage];
    metaVal.forEach((item) => {
      if (item.value.length > 0) {
        switch (item.preference) {
          case "include_word":
            item.value.split("").forEach((letter) => {
              filteredArr = filteredArr.filter((word) => word.includes(letter));
            });
            break;

          case "exclude_word":
            item.value.split("").forEach((letter) => {
              filteredArr = filteredArr.filter(
                (word) => !word.includes(letter),
              );
            });
            break;

          case "first_letter":
            filteredArr = filteredArr.filter((word) => word[0] === item.value);
            break;

          case "second_letter":
            filteredArr = filteredArr.filter((word) => word[1] === item.value);
            break;

          case "third_letter":
            filteredArr = filteredArr.filter((word) => word[2] === item.value);
            break;

          case "fourth_letter":
            filteredArr = filteredArr.filter((word) => word[3] === item.value);
            break;

          case "fifth_letter":
            filteredArr = filteredArr.filter((word) => word[4] === item.value);
            break;

          default:
            break;
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
      metaVal.map((item) => {
        if (item.preference === id) {
          item.value = val;
        }
        return item;
      }),
    );
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
    <main className="container relative mx-auto h-screen">
      <section className="flex h-screen w-full  flex-col items-start lg:flex-row ">
        <div className="popup-btn flex  w-full items-center justify-end p-3 lg:hidden">
          <SelectLanguage
            data={data}
            setLang={setSelectedLanguage}
            lang={selectedLanguage}
            className="mr-4 w-[130px]"
          />
          <button
            className="rounded-[8px] bg-amber-300 p-1 px-2 text-white "
            onClick={() => setHidden(!hidden)}
          >
            Filtrele
          </button>
          <div
            ref={boxRef}
            className={
              "item-center absolute bottom-0 left-0 right-0 top-0 z-50 justify-center bg-[#831843]/40" +
              (hidden ? " flex" : " hidden")
            }
          >
            <div className="relative mt-10 flex h-fit max-h-full w-[300px] flex-col items-center rounded-2xl bg-black p-8">
              <button
                className="absolute right-4 top-4 h-5 w-5 rounded-full bg-pink-900"
                onClick={() => setHidden(!hidden)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                    fill="rgba(255,255,255,1)"
                  ></path>
                </svg>
              </button>
              <Filters lang={selectedLanguage} handle={handleLetter} />
            </div>
          </div>
        </div>
        <Aside
          setLang={setSelectedLanguage}
          lang={selectedLanguage}
          data={data}
          handle={handleLetter}
        />
        <div className="flex  h-auto max-h-full w-full flex-wrap items-start justify-start gap-0.5 overflow-y-auto overflow-x-hidden px-3 lg:w-[calc(100%-300px)]">
          {arr !== undefined &&
            arr.map((word, index) => (
              <button
                key={index}
                type="button"
                className="m-2 rounded-md border-2 border-pink-900 px-2 py-1  text-white hover:bg-pink-900"
                onClick={() => {
                  navigator.clipboard
                    .writeText(word)
                    .then(() => {
                      alert("copied");
                    })
                    .catch((err) => {
                      console.error("error", err);
                    });
                }}
              >
                {word}
              </button>
            ))}
        </div>
      </section>
    </main>
  );
};

export default PageRoot;
