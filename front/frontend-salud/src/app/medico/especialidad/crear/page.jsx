"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import Header from '@/components/Estructura/Header'
import Footer from '@/components/Estructura/Footer'
import FormularioMultiple from '@/components/SeleccionMultiples/FormularioMultiple';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { CartelDescripcionChildren } from '@/components/carteles/CartelDescripcionChildren'
import { Redireccionador } from '@/components/Redireccionador/Redireccionador';

export default function Home() {
    let selectedUserType = 'especialidad'
    return (
        
        <div className="flex flex-col min-h-screen">
            <Header /> 
            <main className="flex-1">
                <div className='flex justify-center py-4'>
                    <CartelDescripcion mensaje="Crear Especialidad"/>
                </div>
                <FormularioMultiple formulario={selectedUserType} />
                <Redireccionador mensaje="Volver" ruta="/medico/especialidad"/>
            </main>
            <Footer />
        </div>
    );
}