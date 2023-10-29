"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { Redireccionador } from '@/components/Redireccionador/Redireccionador';
import ListaEspecialidades from '@/components/Especialidad/ListaEspecialidades'

export default function Home() {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        // Make an HTTP GET request to your backend API
        fetch(`/api/medico/especialidad`, {
            method: 'GET',
        })
            .then(async (response) => {
                const data = await response.json()
                console.log('la data traida del back-front es')
                console.log(data)
                setDatos(data);   
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    }, []); // The empty dependency array ensures the effect runs only once

    return (
        <div className="flex flex-col min-h-screen">
            <Header /> 
            <main className='flex-1'>
                <div className='flex justify-center py-4'>
                    <CartelDescripcion mensaje="Especialidades"/>
                </div>
                <ListaEspecialidades especialidades={datos} />
                <Redireccionador mensaje="Crear Especialidad" ruta="/medico/especialidad/crear"/>
                <Redireccionador mensaje="Home" ruta="/"/>
            </main>
            <Footer />
        </div>
    );
    }
