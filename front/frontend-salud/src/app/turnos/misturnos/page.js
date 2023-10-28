"use client" //para que ejecute cosas en el cliente
import { useEffect, useState } from 'react';
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Turno from "../../../../components/Turno";
import ListaTurno from '../../../../components/Turno/Turno';


export default function MisTurnos() {
    const [datos, setDatos] = useState([]);
    
    const fetchTurnos  = async () => {
        const response = await fetch(`/api/misturnos/ver/`);
        const data = await response.json();
        setDatos(data);

    };

    useEffect(() => {
        fetchTurnos();
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <h1 className="justify-center h-14 font-bold text-black text-5xl text-center py-6">Mis Turnos</h1>
                <main className="w-full flex flex-1 space-x-10 justify-center items-center">
                    <div> <img className="flechas" src="/vector.svg" /></div>
                    <ListaTurno turnos={datos} />
                    <div className="rotate-180"><img className="flechas" src="/vector.svg" /></div>
                </main>
                
                <Footer />
            </div>
            
        </>
    );
}
