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
                <div className='flex justify-center'>
                    <CartelDescripcion mensaje="Pagina para ver usuarios" />
                </div>
                <CartelDescripcionChildren>
                    <div className="flex gap-20 my-4">
                        <button onClick={() => handleUserTypeChange('paciente')}>Crear Paciente</button>
                        <button onClick={() => handleUserTypeChange('medico')}>Crear Médico</button>
                        <button onClick={() => handleUserTypeChange('administrador')}>Crear Administrador</button>
                    </div>
                </CartelDescripcionChildren>

                <FormularioMultiple formulario={selectedUserType} />
                <Redireccionador mensaje="Volver" ruta="/usuario/ver"/>
            </main>
            <Footer />
      </div>
    );
}
