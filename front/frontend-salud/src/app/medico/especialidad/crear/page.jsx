"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import FormularioMultiple from '@/components/SeleccionMultiples/FormularioMultiple';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { Redireccionador } from '@/components/Redireccionador/Redireccionador';
import { useSession } from 'next-auth/react';


export default function Home() {
    const { data: session } = useSession(); // useSession hook to get the current user

    let selectedUserType = 'especialidad'
    if (session && session.user && session.user.usuario) {
        let rol = session.user.usuario.rol
        if (rol == 'administrador') {
            return (
        
                <div className="flex flex-col min-h-screen">
                     
                    <main className="flex-1">
                        <FormularioMultiple formulario={selectedUserType} />
                        <Redireccionador mensaje="Volver" ruta="/medico/especialidad"/>
                    </main>
                    
                </div>
            );
        } else {
            return (<div>
                <CartelDescripcion mensaje="Acceso no autorizado. Debe ser administrador para poder acceder a esta pagina"/>
            </div>)
        }
    }
    
}