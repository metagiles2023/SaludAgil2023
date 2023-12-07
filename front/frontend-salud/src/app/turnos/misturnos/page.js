"use client" //para que ejecute cosas en el cliente
import { useEffect, useState } from 'react';
import Header from "@/components/Estructura/Header";
import Footer from "@/components/Estructura/Footer";
import Turno from "@/components/Turno";
import ListaTurno from '@/components/Turno/Turno';
import { useSession } from 'next-auth/react'; // Import useSession hook
const controller = new AbortController(); // Create an AbortController
const signal = controller.signal; // Get the signal from the controller

export default function MisTurnos() {

    //sesion
    const { data: session } = useSession(); // useSession hook to get the current user
    const [token, setToken] = useState([])

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        console.log("USE EFFECT MIS TURNOS")
        let user = session?.user
        let token = user && user.token ? user.token : "no-token-for-fichasmedicasfiltradas"
        setToken(token)
        console.log(session);
      }, [session])

   
      
      /*

    useEffect(() => {
        fetch(`/api/misturnos/ver`,{
            method: 'POST',
            body: JSON.stringify({token: token}),

        }).then(async (response) => {
            const data = await response.json();
            console.log(data);
            setDatos(data);
        
        });
    }, [token]); // Al inicio

    */
    
    const fetchTurnos  = async () => {
        const response = await fetch(`/api/misturnos/ver`,{
            method: 'POST',
            body: JSON.stringify({token: token})
        });
        const data = await response.json();
        console.log("datos turno cancelar");
        console.log(data);
        setDatos(data);

    };

    useEffect(() => {
        fetchTurnos();
    }, [token]);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                
                <main className="flex flex-col flex-1 items-center">
                    <h1 className="flex h-14 font-bold text-black text-5xl text-center my-6">Mis Turnos</h1>
                    <div className='flex w-full flex-1 items-center justify-center px-20'>
                        <div className='flex w-full justify-center items-center'>    
                            <ListaTurno turnos={datos} />
                        </div>
                    </div>
                </main>
                
            </div>
        </>
    );
}
