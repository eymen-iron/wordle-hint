'use client';


import Filters from "@/app/filters";

const Aside = ({handle}) => {

    return (
        <aside className='hidden lg:flex flex-col gap-3 w-[280px] py-4 pr-2 border-r-2 border-[#db2777] h-screen'>
            <Filters handle={handle}/>
        </aside>
    );
}

export default Aside;
