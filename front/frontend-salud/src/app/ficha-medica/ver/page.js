"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import FichasMedicasFiltradas from '@/components/FichasMedicasFiltradas/FichasMedicasFiltradas'
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
//import Filtro from '@/components/Filtro2.0/filtro2.0';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
        <Header /> 
        <main className="flex-1 flex flex-col text-black">
            <FichasMedicasFiltradas/>
        </main>
        <Footer />
      </div>

    );
}
