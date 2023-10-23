"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import FormularioMultiple from '@/components/SeleccionMultiples/FormularioMultiple';
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { CartelDescripcionChildren } from '@/components/carteles/CartelDescripcionChildren'

export default function Home() {
    const [selectedUserType, setSelectedUserType] = useState('usuario');
    
    const handleUserTypeChange = (userType) => {
        setSelectedUserType(userType);
    };

    return (
        <main className="flex flex-col">
            <div>
                <NavBar />
            </div>

            <CartelDescripcion mensaje="Pagina para ver usuarios" />
            <CartelDescripcionChildren>
                <div className="flex space-x-4 my-4">
                    <button onClick={() => handleUserTypeChange('paciente')}>Crear Paciente</button>
                    <button onClick={() => handleUserTypeChange('medico')}>Crear Médico</button>
                    <button onClick={() => handleUserTypeChange('administrador')}>Crear Administrador</button>
                </div>
            </CartelDescripcionChildren>

            <FormularioMultiple formulario={selectedUserType} />
        </main>
    );
}
