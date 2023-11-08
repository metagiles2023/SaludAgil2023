"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import ListaMultiple from '@/components/SeleccionMultiples/ListaMultiple';
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
        <div className="flex flex-col min-h-screen">
        <Header /> 
        <main className="flex-1 flex flex-col">
            <div className='flex justify-center'>
                <CartelDescripcion mensaje="Pagina para ver usuarios"/>
            </div>
            <CartelDescripcionChildren>
                <div className="flex gap-20 my-4">
                <button onClick={() => handleUserTypeChange('usuario')}>Todos los usuarios</button>
                <button onClick={() => handleUserTypeChange('paciente')}>Pacientes</button>
                <button onClick={() => handleUserTypeChange('medico')}>Médicos</button>
                <button onClick={() => handleUserTypeChange('administrador')}>Administradores</button>
                </div>
            </CartelDescripcionChildren>
            <ListaMultiple lista={selectedUserType} datos={datos} />
            <Redireccionador mensaje="Crear Usuario" ruta="/usuario/crear"/>
        </main>
        <Footer />
    </div>
    );
    }
