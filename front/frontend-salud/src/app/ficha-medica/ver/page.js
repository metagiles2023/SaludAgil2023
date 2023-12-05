"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import FichasMedicasFiltradas from '@/components/FichasMedicasFiltradas/FichasMedicasFiltradas'
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { Redireccionador } from '@/components/Redireccionador/Redireccionador'

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            
            <main className="flex1 flex flex-col text-black">
                <FichasMedicasFiltradas/>
            </main>
            <Redireccionador mensaje="Crear Ficha Medica" ruta="/ficha-medica/crear"/>
            
        </div> 
    );
}
