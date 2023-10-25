"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Turno from "../../../../components/Turno";
import ListaMultiple from '../../../../components/SeleccionMultiples/ListaMultiple';
import { CartelDescripcion } from '../../../../components/carteles/CartelDescripcion';
import { CartelDescripcionChildren } from '../../../../components/carteles/CartelDescripcionChildren'

export default function MisTurnos() {
    const [datos, setDatos] = useState([]);
    const [selectedTurnos, setselectedTurnos] = useState('misturnos');
    useEffect(() => {
    // Make an HTTP GET request to your backend API
    fetch(`/api/${selectedTurnos}`, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
        // Update the fichaMedica state with the data from the backend
        setDatos(data);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    }, [selectedTurnos]); // The empty dependency array ensures the effect runs only once

    const handleTurnosChange = (newTurno) => {
        console.log(newTurno)
        setselectedTurnos(()=>newTurno);
      };


    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="w-full flex space-x-10 justify-center items-center  left-0 right-0">
                    <div className="justify-center h-14 font-bold text-black text-5xl text-center tracking-[0] leading-[normal] whitespace-nowrap relative left-0 top-10">Mis Turnos</div>
                    <Turno />
                    <Turno />
                    <Turno />
                    <Turno />
                    
                </main>
                <div className="w-full flex items-center fixed bottom-5 left-10 top-0"><img class="flechas" src="/vector.svg" /></div>
                <div className="flex items-center fixed bottom-5 end-10 top-0 rotate-180"><img class="flechas" src="/vector.svg" /></div>
                <Footer />
            </div>
            
          
        </>
    )
}
