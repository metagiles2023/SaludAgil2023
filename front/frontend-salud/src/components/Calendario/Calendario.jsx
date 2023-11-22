import React from "react";
import CartaDia from "@/components/Calendario/CartaDia";

function Calendario(){
    
    return (
        <div>
            <div className="flex flex-col item-center p-5 bg-slate-200 rounded-[30px] shadow-gray-600">
                <div className="flex justify-center text-black font-bold text-3xl">Octubre</div>
                <div className="flex justify-between py-2 text-black text-lg font-bold">
                    <h1 className="flex w-[100px] justify-center"> Lunes</h1>
                    <h1 className="flex w-[100px]  justify-center"> Martes</h1>
                    <h1 className="flex w-[100px]  justify-center"> Miercoles</h1>
                    <h1 className="flex w-[100px]  justify-center"> Jueves</h1>
                    <h1 className="flex w-[100px]  justify-center"> Viernes</h1>
                    <h1 className="flex w-[100px]  justify-center"> Sabado</h1>
                    <h1 className="flex w-[100px]  justify-center"> Domingo</h1>
                </div>
                <div className="flex flex-col px-4 gap-5 justify-center">
                    <div className="flex justify-between">
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                    </div>
                    <div className="flex justify-between">
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                    </div>
                    <div className="flex justify-between">
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                    </div>
                    <div className="flex justify-between">
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                    </div>
                    <div className="flex justify-between">
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                        <CartaDia dia={"1"}/>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Calendario;

/*
<div className="flex justify-between text-black">
                    <h1 className="flex flex-grow justify-center"> Lunes</h1>
                    <h1 className="flex flex-grow justify-center"> Martes</h1>
                    <h1 className="flex flex-grow justify-center"> Miercoles</h1>
                    <h1 className="flex flex-grow justify-center"> Jueves</h1>
                    <h1 className="flex flex-grow justify-center"> Viernes</h1>
                    <h1 className="flex flex-grow justify-center"> Sabado</h1>
                    <h1 className="flex flex-grow justify-center"> Domingo</h1>
*/