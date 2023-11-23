'use client';
import Header from "@/components/Estructura/Header";
import ContenidoTabla from "@/components/CargaDeTurnos/ContTablaRangoHorario";
import Footer from "@/components/Estructura/Footer";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function dias(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
}

export default function Turnos() {
    const [value, setValue] = useState(0);
    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex justify-center items-center">
                <div className="flex bg-white border-blue-500 border-[2px] rounded-[30px] overflow-hidden">
                    <div className="flex flex-col pb-5"> 
                        <Box sx={{ borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChangeTabs} aria-label="Tabla dias">
                                <Tab className="font-roboto text-xl" label="Lunes" {...dias(0)} />
                                <Tab className="font-roboto text-xl" label="Martes" {...dias(1)} />
                                <Tab className="font-roboto text-xl" label="Miercoles" {...dias(2)} />
                                <Tab className="font-roboto text-xl" label="Jueves" {...dias(3)} />
                                <Tab className="font-roboto text-xl" label="Viernes" {...dias(4)} />
                                <Tab className="font-roboto text-xl" label="Sabado" {...dias(5)} />
                                <Tab className="font-roboto text-xl" label="Domingo" {...dias(6)} />
                            </Tabs>
                        </Box>
                        {value === 0 && (
                            <div className="flex flex-col m-5">
                                <ContenidoTabla />
                            </div>
                        )}

                        {value === 1 && (
                            <div className="flex flex-col m-5">
                                <h1 className="font-roboto text-xl">
                                    <ContenidoTabla />
                                </h1>
                            </div>
                        )}

                        {value === 2 && (
                            <div className="flex flex-col m-5">
                                <h1 className="font-roboto text-xl">
                                    <ContenidoTabla />
                                </h1>
                            </div>
                        )}

                        {value === 3 && (
                            <div className="flex flex-col m-5">
                                <h1 className="font-roboto text-xl">
                                    <ContenidoTabla />
                                </h1>
                            </div>
                        )}

                        {value === 4 && (
                            <div className="flex flex-col m-5">
                                <h1 className="font-roboto text-xl">
                                    <ContenidoTabla />
                                </h1>
                            </div>
                        )}

                        {value === 5 && (
                            <div className="flex flex-col m-5">
                                <h1 className="font-roboto text-xl">
                                    <ContenidoTabla />
                                </h1>
                            </div>
                        )}

                        {value === 6 && (
                            <div className="flex flex-col m-5">
                                <h1 className="font-roboto text-xl">
                                    <ContenidoTabla />
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
        
    );
}
