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
                <h1 className="justify-center h-14 font-bold text-black text-5xl text-center py-6">Mis Turnos</h1>
                <main className="w-full flex flex-1 space-x-10 justify-center items-center">
                    <div> <img class="flechas" src="/vector.svg" /></div>
                    <Turno />
                    <Turno />
                    <Turno />
                    <Turno />
                    <div className="rotate-180"><img class="flechas" src="/vector.svg" /></div>
                </main>
                
                <Footer />
            </div>
            
          
        </>
    )
}
