"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import ListaMultiple from '@/components/SeleccionMultiples/ListaMultiple';
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { CartelDescripcionChildren } from '@/components/carteles/CartelDescripcionChildren'
import { Redireccionador } from '@/components/Redireccionador/Redireccionador';

export default function Home() {
    const [datos, setDatos] = useState([]);
    const [selectedUserType, setSelectedUserType] = useState('usuario');
    useEffect(() => {
    // Make an HTTP GET request to your backend API
    fetch(`/api/${selectedUserType}`, {
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
        
        <CartelDescripcion mensaje="Pagina para ver usuarios"/>
        <CartelDescripcionChildren>
            <div className="flex space-x-4 my-4">
            <button onClick={() => handleUserTypeChange('usuario')}>Todos los usuarios</button>
            <button onClick={() => handleUserTypeChange('paciente')}>Pacientes</button>
            <button onClick={() => handleUserTypeChange('medico')}>Médicos</button>
            <button onClick={() => handleUserTypeChange('administrador')}>Administradores</button>
            </div>
        </CartelDescripcionChildren>
        <ListaMultiple lista={selectedUserType} datos={datos} />
        <Redireccionador mensaje="Crear Usuario" ruta="/usuario/crear"/>
    </main>
    );
    }
