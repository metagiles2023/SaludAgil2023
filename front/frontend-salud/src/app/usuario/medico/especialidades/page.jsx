"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import ListaMultiple from '@/components/SeleccionMultiples/ListaMultiple';
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { CartelDescripcionChildren } from '@/components/carteles/CartelDescripcionChildren'
import { Redireccionador } from '@/components/Redireccionador/Redireccionador';

export default function Home() {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        // Make an HTTP GET request to your backend API
        fetch(`/api/medico/especialidades`, {
            method: 'GET',
        })
            .then(async (response) => {
                const data = await response.json()
                setDatos(data);   
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    }, [selectedUserType]); // The empty dependency array ensures the effect runs only once

    const handleUserTypeChange = (newUserType) => {
        console.log(newUserType)
        setSelectedUserType(()=>newUserType);
      };

    return (
    <main className="flex flex-col">
        <div>
            <NavBar/>
        </div>
        
        <CartelDescripcion mensaje="Especialidades"/>
        <ListaEspecialidades datos={datos} />
        <Redireccionador mensaje="Home" ruta="/"/>
    </main>
    );
    }
