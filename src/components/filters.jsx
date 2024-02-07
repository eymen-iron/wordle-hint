"use client";

import { __ } from "@/utils/transilation";

const Filters = ({ handle, lang }) => {
  return (
    <div className="w-full" data_table="filter-inputs">
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
      <div className="form__group field">
        <input
          id="first_letter"
          type="text"
          className="form__field"
          maxLength={1}
          data-id={1}
          onChange={handle}
          placeholder="İçerdiği Harf"
        />
        <label htmlFor="include_word_1" className="form__label">
          {__("İlk Harf", lang)}
        </label>
      </div>
      <div className="form__group field">
        <input
          id="second_letter"
          type="text"
          className="form__field"
          maxLength={1}
          data-id={2}
          onChange={handle}
          placeholder="İçerdiği Harf"
        />
        <label htmlFor="include_word_2" className="form__label">
          {__("İkinci Harf", lang)}
        </label>
      </div>
      <div className="form__group field">
        <input
          id="third_letter"
          type="text"
          className="form__field"
          maxLength={1}
          data-id={3}
          onChange={handle}
          placeholder="İçerdiği Harf"
        />
        <label htmlFor="include_word_3" className="form__label">
          {__("Üçüncü Harf", lang)}
        </label>
      </div>
      <div className="form__group field">
        <input
          id="fourth_letter"
          type="text"
          className="form__field"
          maxLength={1}
          data-id={4}
          onChange={handle}
          placeholder="İçerdiği Harf"
        />
        <label htmlFor="include_word_4" className="form__label">
          {__("Dördüncü Harf", lang)}
        </label>
      </div>
      <div className="form__group field">
        <input
          id="fifth_letter"
          type="text"
          className="form__field"
          maxLength={1}
          data-id={5}
          onChange={handle}
          placeholder="İçerdiği Harf"
        />
        <label htmlFor="include_word_5" className="form__label">
          {__("Beşinci Harf", lang)}
        </label>
      </div>
      <div className="form__group field">
        <input
          id="exclude_word"
          type="text"
          className="form__field"
          name="exclude_word"
          onChange={handle}
          placeholder="Harf Dışı"
        />
        <label htmlFor="exclude_word" className="form__label">
          {__("Harf Dışı", lang)}
        </label>
      </div>
    </div>
  );
};

export default Filters;
