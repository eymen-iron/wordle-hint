'use client';
const Filters = ({handle}) => {
    return (
        <>
            <div className='form__group field'>
                <input id='include_word' type="text" className='form__field' name='include_word' maxLength={5} onChange={handle}
                       placeholder='İçerdiği Harfler'/>
                <label htmlFor="include_word" className='form__label'>
                    İçerdiği Harfler
                </label>
            </div>
            <div className='form__group field'>
                <input id='first_letter' type="text" className='form__field' maxLength={1} data-id={1} onChange={handle}
                       placeholder='İçerdiği Harf'/>
                <label htmlFor="include_word_1" className='form__label'>
                    İlk Harf
                </label>
            </div>
            <div className='form__group field'>
                <input id='second_letter' type="text" className='form__field' maxLength={1} data-id={2} onChange={handle}
                       placeholder='İçerdiği Harf'/>
                <label htmlFor="include_word_2" className='form__label'>
                    İkinci Harf
                </label>
            </div>
            <div className='form__group field'>
                <input id='third_letter' type="text" className='form__field' maxLength={1} data-id={3} onChange={handle}
                       placeholder='İçerdiği Harf'/>
                <label htmlFor="include_word_3" className='form__label'>
                    Üçüncü Harf
                </label>
            </div>
            <div className='form__group field'>
                <input id='fourth_letter' type="text" className='form__field' maxLength={1} data-id={4} onChange={handle}
                       placeholder='İçerdiği Harf'/>
                <label htmlFor="include_word_4" className='form__label'>
                    Dördüncü Harf
                </label>
            </div>
            <div className='form__group field'>
                <input id='fifth_letter' type="text" className='form__field' maxLength={1} data-id={5} onChange={handle}
                       placeholder='İçerdiği Harf'/>
                <label htmlFor="include_word_5" className='form__label'>
                    Beşinci Harf
                </label>
            </div>
            <div className='form__group field'>
                <input id='exclude_word' type="text" className='form__field' name='exclude_word' onChange={handle}
                       placeholder='Harf Dışı'/>
                <label htmlFor="exclude_word" className='form__label'>
                    Harf Dışı
                </label>
            </div>
        </>
    )
}

export  default Filters;
