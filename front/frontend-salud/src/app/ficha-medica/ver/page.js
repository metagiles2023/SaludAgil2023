"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import FichasMedicasFiltradas from '@/components/FichasMedicasFiltradas/FichasMedicasFiltradas'
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
//import Filtro from '@/components/Filtro2.0/filtro2.0';

export default function Home() {
    return (
    <main className="flex flex-col">
        <div>
        <NavBar />
        </div>
        <div> 
            <FichasMedicasFiltradas/>
        </div>
   
    </main>
    );
}
