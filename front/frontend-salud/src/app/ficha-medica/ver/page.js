"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import FichasMedicasFiltradas from '@/components/FichasMedicasFiltradas/FichasMedicasFiltradas'
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
        </main>
        <Footer />
      </div>
     <Redireccionador mensaje="Crear Ficha Medica" ruta="/ficha-medica/crear"/>
    );
}
