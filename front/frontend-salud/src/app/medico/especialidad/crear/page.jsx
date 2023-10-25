"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import FormularioMultiple from '@/components/SeleccionMultiples/FormularioMultiple';
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { CartelDescripcionChildren } from '@/components/carteles/CartelDescripcionChildren'
import { Redireccionador } from '@/components/Redireccionador/Redireccionador';

export default function Home() {
    let selectedUserType = 'especialidad'
    return (
        <main className="flex flex-col">
            <div>
                <NavBar />
            </div>

            <CartelDescripcion mensaje="Crear Especialidad"/>
            <FormularioMultiple formulario={selectedUserType} />
            <Redireccionador mensaje="Volver" ruta="/medico/especialidad"/>
        </main>
    );
}