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
                <div className='my-4'/>
                <div className="flex gap-20 my-0">
                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 py-4 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800' onClick={() => handleUserTypeChange('usuario')}>Todos los usuarios</button>
                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 py-4 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800' onClick={() => handleUserTypeChange('paciente')}>Pacientes</button>
                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 py-4 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800' onClick={() => handleUserTypeChange('medico')}>Médicos</button>
                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 py-4 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800' onClick={() => handleUserTypeChange('administrador')}>Administradores</button>
                </div>
            
            <ListaMultiple lista={selectedUserType} datos={datos}  />
            <Redireccionador mensaje="Crear Usuario" ruta="/usuario/crear" />
        </main>
        <Footer />
    </div>
    );
    }
