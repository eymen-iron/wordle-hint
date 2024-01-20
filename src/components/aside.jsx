'use client';


import Filters from "@/components/filters";

const Aside = ({handle}) => {

    return (
        <aside className='hidden lg:flex flex-col gap-3 w-[280px] py-4 pr-2 border-r-2 border-[#db2777] h-screen'>
            <Filters handle={handle}/>
            <a href="https://www.instagram.com/simeon_eymen" target='_blanksu ' className="mt-auto text-purple-400 text-start">@simeon_eymen</a>
        </aside>
    );
}

export default Aside;
