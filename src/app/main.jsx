'use client';

import words from "./wordList.json";
import Aside from "./aside";
import {useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Filters from "@/app/filters";

const PageRoot = () => {
    const [arr, setArr] = useState(words);
    const [hidden, setHidden] = useState(false);
    const [metaVal, setMetaVal] = useState([
            {
                preference: 'include_word',
                value: ''
            },
            {
                preference: 'exclude_word',
                value: ''
            },
            {
                preference: 'first_letter',
                value: ''
            },
            {
                preference: 'second_letter',
                value: ''
            },
            {
                preference: 'third_letter',
                value: ''
            },
            {
                preference: 'fourth_letter',
                value: ''
            },
            {
                preference: 'fifth_letter',
                value: ''
            }
        ]
    );
    useEffect(() => {
        let filteredArr = words;

        metaVal.forEach(item => {
            if (item.value.length > 0) {
                switch (item.preference) {
                    case 'include_word':
                        item.value.split('').forEach(letter => {
                            filteredArr = filteredArr.filter(word => word.includes(letter));
                        });
                        break;

                    case 'exclude_word':
                        item.value.split('').forEach(letter => {
                            filteredArr = filteredArr.filter(word => !word.includes(letter));
                        });
                        break;

                    case 'first_letter':
                        filteredArr = filteredArr.filter(word => word[0] === item.value);
                        break;

                    case 'second_letter':
                        filteredArr = filteredArr.filter(word => word[1] === item.value);
                        break;

                    case 'third_letter':
                        filteredArr = filteredArr.filter(word => word[2] === item.value);
                        break;

                    case 'fourth_letter':
                        filteredArr = filteredArr.filter(word => word[3] === item.value);
                        break;

                    case 'fifth_letter':
                        filteredArr = filteredArr.filter(word => word[4] === item.value);
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
        setMetaVal(metaVal.map(item => {
            if (item.preference === id) {
                item.value = val;
            }
            return item;
        }))

    }
    return (
        <main className="container mx-auto h-screen relative">
            <section className='flex flex-col lg:flex-row  items-start w-full h-screen '>
                <div className="popup-btn w-full  items-center justify-end p-3 lg:hidden flex" >
                    <button className='bg-amber-300 text-white rounded-[8px] px-2 p-1 ' onClick={() => setHidden(!hidden)} >
                        Filtrele
                    </button>
                    <div className={"absolute top-0 right-0 left-0 bottom-0 bg-[#831843]/40 z-50 item-center justify-center" + (hidden ? ' flex' : ' hidden')}>
                        <div className="flex flex-col items-center w-[300px] rounded-2xl bg-black h-fit max-h-full p-8 mt-10 relative">
                            <button className='bg-pink-900 absolute top-4 right-4 w-5 h-5 rounded-full' onClick={()=> setHidden(!hidden)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z" fill="rgba(255,255,255,1)"></path></svg>
                            </button>
                            <Filters handle={handleLetter} />
                        </div>
                    </div>
                </div>
                <Aside handle={handleLetter} />
                <div
                    className='w-full  lg:w-[calc(100%-300px)] px-3 flex flex-wrap items-start justify-start gap-0.5 h-auto max-h-full overflow-y-auto overflow-x-hidden'>
                    {arr.map((word, index) => (
                        <button key={index} type='button' className="px-2 py-1 m-2 border-2 border-pink-900 hover:bg-pink-900  text-white rounded-md" >
                            {word}
                        </button>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default PageRoot;
