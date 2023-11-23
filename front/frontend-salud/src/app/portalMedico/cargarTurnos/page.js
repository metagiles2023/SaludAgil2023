'use client';
import Header from "@/components/Estructura/Header";
import Footer from "@/components/Estructura/Footer";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';

function dias(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

export default function Turnos() {
    const [value, setValue] = useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex justify-center items-center">
                <div className="flex bg-white border-blue-500 border-[2px] rounded-[30px] overflow-hidden">
                    <div className="flex flex-col "> 
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="Tabla dias">
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
                            <div className="flex flex-col bg-green-100 m-5 h-[40vh]">
                                    <div className="flex w-full h-full my-5 justify-center">
                                        <div className="flex flex-col w-full h-full">
                                            <div className="flex w-full h-12 justify-between px-20">
                                                <div className="flex w-2/3 justify-center text-black bg-white rounded-[30px]">
                                                    Desde
                                                </div>
                                                <div className="flex w-2/3 justify-center text-black bg-white rounded-[30px]">
                                                    Desde
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex w-8/12 content-between justify-between px-20">
                                            <div className="flex w-2/3 h-12 justify-center text-black bg-white rounded-[30px]">
                                                Desde
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mb-5 mr-5"> 
                                        <Button className="flex bg-green-500" variant="contained" color="success">
                                            Guardar
                                        </Button>
                                    </div>
                                </div>
                        )}

                        {value === 1 && (
                            <div className="bg-green-200 m-5 h-[40vh]">
                                <h1 className="font-roboto text-xl">
                                    holaaa 1
                                </h1>
                            </div>
                        )}

                        {value === 2 && (
                            <div className="bg-green-300 m-5 h-[40vh]">
                                <h1 className="font-roboto text-xl">
                                    holaaa 2
                                </h1>
                            </div>
                        )}

                        {value === 3 && (
                            <div className="bg-green-400 m-5 h-[40vh]">
                                <h1 className="font-roboto text-xl">
                                    holaaa 3
                                </h1>
                            </div>
                        )}

                        {value === 4 && (
                            <div className="bg-green-500 m-5 h-[40vh]">
                                <h1 className="font-roboto text-xl">
                                    holaaa 4
                                </h1>
                            </div>
                        )}

                        {value === 5 && (
                            <div className="bg-green-600 m-5 h-[40vh]">
                                <h1 className="font-roboto text-xl">
                                    holaaa 5
                                </h1>
                            </div>
                        )}

                        {value === 6 && (
                            <div className="bg-green-700 m-5 h-[40vh]">
                                <h1 className="font-roboto text-xl">
                                    holaaa 6
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