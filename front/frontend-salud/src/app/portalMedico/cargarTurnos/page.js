'use client';
import React, { useState, useEffect } from 'react';
import Header from "@/components/Estructura/Header";
import ContenidoTabla from "@/components/CargaDeTurnos/ContTablaRangoHorario";
import Footer from "@/components/Estructura/Footer";

function dias(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }
  
  export default function Turnos() {
    const [selectedDays, setSelectedDays] = useState([]);

    const handleDayClick = (event, index) => {
        const isRightClick = event.button === 2;
        if (isRightClick) {
            const updatedSelectedDays = [...selectedDays, index];
            setSelectedDays(updatedSelectedDays);
        } else {
            setSelectedDays([index]);
        }
    };
    
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex justify-center items-center">
                <div className="flex  bg-white border-blue-500 border-[2px] rounded-[30px] overflow-hidden">
                    <div className="flex flex-col pb-5"> 
                        <div className="flex pb-5">
                            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day, index) => (
                                <button
                                    key={index}
                                    className={`font-roboto text-xl p-4 ${
                                        selectedDays.includes(index) ? 'bg-green-500  text-white border-b-[2px] border-blue-700 hover:bg-green-600' : 'bg-white text-gray-500 hover:bg-gray-200'
                                    }`}
                                    style={{
                                        transition: 'background-color 400ms, color 400ms',
                                        outline: 'none'
                                      }}
                                    onMouseDown={(event) => handleDayClick(event, index)}
                                    onContextMenu={(event) => handleContextMenu(event, index)}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                        <ContenidoTabla selectedDays={selectedDays} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>

    );
}
