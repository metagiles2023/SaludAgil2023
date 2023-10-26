"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import FichasMedicasFiltradas from '@/components/FichasMedicasFiltradas/FichasMedicasFiltradas'
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { Redireccionador } from '@/components/Redireccionador/Redireccionador'

export default function Home() {
    return (
    <main className="flex flex-col">
        <div>
        <NavBar />
        </div>
        <div> 
            <FichasMedicasFiltradas/>
        </div>
        <Redireccionador mensaje="Crear Ficha Medica" ruta="/ficha-medica/crear"/>
    </main>
    );
}
