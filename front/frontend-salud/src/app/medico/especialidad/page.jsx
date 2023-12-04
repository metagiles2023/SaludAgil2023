"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Redireccionador } from '@/components/Redireccionador/Redireccionador';
import ListaEspecialidades from '@/components/Especialidad/ListaEspecialidades'
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';

export default function Home() {
    const { data: session } = useSession(); // useSession hook to get the current user
    const [token, setToken] = useState([])
    const [datos, setDatos] = useState([]);

    useEffect(()=>{
        let user = session?.user
        let token = user && user.token ? user.token : "no-token-for-formulario"
        setToken(token)
    }, [session])

    useEffect(() => {
        // Make an HTTP GET request to your backend API
        if (session && session.user && session.user.usuario) {
            let rol = session.user.usuario.rol
            if (rol == 'administrador' || rol == 'medico') {
                fetch(`/api/medico/especialidad`, {
                    method: 'POST',
                    body: JSON.stringify({token: token})
                })
                    .then(async (response) => {
                        const data = await response.json()
                        console.log('la data traida del back-front es')
                        console.log(data)
                        setDatos(data);   
                    })
                    .catch((error) => {
                    console.error('Error fetching data:', error);
                    });
            }
        }
        
    }, [token]);
    if (session && session.user && session.user.usuario && session.user.usuario.rol != 'paciente'){
        return (
            <div className="flex flex-col min-h-screen">
                
                <main className='flex-1'>
                    <ListaEspecialidades especialidades={datos} />
                    {session.user.usuario.rol == 'administrador' ? (
                        <Redireccionador mensaje="Crear Especialidad" ruta="/medico/especialidad/crear"/>
                    ) : null}
                    
                </main>
                
            </div>
        );
    } else {
        return (<div>
            <CartelDescripcion mensaje="Acceso no autorizado. Debe ser medico o administrador para ver esta pagina"/>
        </div>)
    }
    
    }
