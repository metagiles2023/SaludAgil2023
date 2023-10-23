"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import ListaUsuarios from '@/components/Usuario/Usuario';
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';

    export default function Home() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
    // Make an HTTP GET request to your backend API
    fetch("/api/usuario", {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
        // Update the fichaMedica state with the data from the backend
        setUsuarios(data);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    }, []); // The empty dependency array ensures the effect runs only once

    return (
    <main className="flex flex-col">
        <div>
            <NavBar/>
        </div>
        
        <CartelDescripcion mensaje="Pagina para ver usuarios"/>
        <ListaUsuarios usuarios={usuarios} />
    </main>
    );
    }
