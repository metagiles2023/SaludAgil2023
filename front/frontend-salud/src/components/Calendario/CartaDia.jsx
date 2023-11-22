import React from 'react';

function CartaDia({ dia }) {
    
    return (
        <div className="flex flex-col  h-16">
            <div className="relative justify-between px-2.5 ">
                <div className="absolute w-[6px] h-3 bg-black rounded-sm left-12 top-0 bg-black"></div>
                <div className="absolute w-[6px] h-3 bg-black rounded-sm left-[11px] top-0 bg-black"></div>
            </div>
            <div className="flex flex-col w-[65px] h-[59px] rounded left-0 top-[5px] mt-1 bg-stone-200">
                <div className="flex px-2 w-[65px] h-[13px] bg-[#ff5353] rounded left-0 top-[5px] bg-red-500">
                </div>
                <div className="flex justify-center item-center w-[63px] h-[46px] font-bold text-black text-[40px] text-center leading-[normal] left-0 top-[17px]">{dia}</div>
            </div>
        </div>
    );
}

export default CartaDia;
