"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import ListaMultiple from '@/components/SeleccionMultiples/ListaMultiple';
import { Redireccionador } from '@/components/Redireccionador/Redireccionador';
import { useSession } from 'next-auth/react'; // Import useSession hook
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';

export default function Home() {
    const [datos, setDatos] = useState([]);
    const [selectedUserType, setSelectedUserType] = useState('usuario');
    const { data: session } = useSession(); // useSession hook to get the current user
    const [token, setToken] = useState([])

    useEffect(()=>{
        let user = session?.user
        let token = user && user.token ? user.token : "no-token-for-usuario-ver-page"
        setToken(token)
    }, [session])

    useEffect(() => {
        // Make an HTTP GET request to your backend API
        console.log(`envio a /api/${selectedUserType} con token`)
        console.log(token)
        fetch(`/api/${selectedUserType}`, {
            method: 'POST',
            body: JSON.stringify({ token: token })
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the fichaMedica state with the data from the backend
                setDatos(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [selectedUserType, token]); // The empty dependency array ensures the effect runs only once

    const handleUserTypeChange = (newUserType) => {
        console.log(newUserType)
        setSelectedUserType(()=>newUserType);
      };
    
    if (session && session.user && session.user.usuario && (session.user.usuario.rol == 'administrador' || session.user.usuario.rol == 'medico')) {
        return (
        <div className="flex flex-col min-h-screen">
        
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
        
    </div>
    );
    } else return (
    <div>
        <CartelDescripcion mensaje="Acceso no autorizado. Debe ser administrador o medico para ver los usuarios"/>
    </div>
    )
}