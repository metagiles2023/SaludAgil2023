"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import FormularioMultiple from '@/components/SeleccionMultiples/FormularioMultiple';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { CartelDescripcionChildren } from '@/components/carteles/CartelDescripcionChildren'
import { Redireccionador } from '@/components/Redireccionador/Redireccionador';

export default function Home() {
    const [selectedUserType, setSelectedUserType] = useState('usuario');
    
    const handleUserTypeChange = (userType) => {
        setSelectedUserType(userType);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header /> 
            <main className="flex-1 flex flex-col">
                <div className='my-4' />
                    <div className="flex gap-20 my-4">
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 py-4 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800' onClick={() => handleUserTypeChange('paciente')}>Crear Paciente</button>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 py-4 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800' onClick={() => handleUserTypeChange('medico')}>Crear Médico</button>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 py-4 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800' onClick={() => handleUserTypeChange('administrador')}>Crear Administrador</button>
                    </div>

                <FormularioMultiple formulario={selectedUserType} />
                <Redireccionador mensaje="Volver" ruta="/usuario/ver"/>
            </main>
            <Footer />
      </div>
    );
}
