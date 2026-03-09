"use client";

import { __ } from "@/utils/translation";

const positions = [
  { pos: "first_letter", notPos: "not_first_letter", label: "İlk Harf", num: "1" },
  { pos: "second_letter", notPos: "not_second_letter", label: "İkinci Harf", num: "2" },
  { pos: "third_letter", notPos: "not_third_letter", label: "Üçüncü Harf", num: "3" },
  { pos: "fourth_letter", notPos: "not_fourth_letter", label: "Dördüncü Harf", num: "4" },
  { pos: "fifth_letter", notPos: "not_fifth_letter", label: "Beşinci Harf", num: "5" },
];

const Filters = ({ handle, lang }) => {
  return (
    <div className="w-full" data_table="filter-inputs">
      {/* Included letters */}
      <div className="form__group field">
        <input
          id="include_word"
          type="text"
          className="form__field"
          name="include_word"
          maxLength={5}
          onChange={handle}
          placeholder={__("İçerdiği Harfler", lang)}
        />
        <label htmlFor="include_word" className="form__label">
          {__("İçerdiği Harfler", lang)}
        </label>
      </div>

      {/* Position rows */}
      {positions.map(({ pos, notPos, label, num }) => (
        <div key={pos} className="mt-3">
          <span className="mb-1 block text-[11px] font-medium text-gray-500">
            {num}. {__(label, lang)}
          </span>
          <div className="flex items-center gap-2">
            <input
              id={pos}
              type="text"
              className="form__field !border-b-green-700 !pb-1 !pt-0 focus:!border-b-green-500"
              maxLength={1}
              onChange={handle}
              placeholder="="
              title={__(label, lang)}
            />
            <input
              id={notPos}
              type="text"
              className="form__field !border-b-amber-800 !pb-1 !pt-0 focus:!border-b-amber-500"
              maxLength={5}
              onChange={handle}
              placeholder="≠"
              title={__("Harf Dışı", lang)}
            />
          </div>
        </div>
      ))}

      {/* Excluded letters */}
      <div className="form__group field">
        <input
          id="exclude_word"
          type="text"
          className="form__field"
          name="exclude_word"
          onChange={handle}
          placeholder={__("Harf Dışı", lang)}
        />
        <label htmlFor="exclude_word" className="form__label">
          {__("Harf Dışı", lang)}
        </label>
      </div>
    </div>
  );
};

export default Filters;
