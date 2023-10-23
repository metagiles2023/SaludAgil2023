"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import FichaMedica from '@/components/FichaMedica/FichaMedica';
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';

export default function Home() {
  const [fichasMedicas, setFichaMedica] = useState([]);

  useEffect(() => {
    console.log('xd')
    // Make an HTTP GET request to your backend API
    fetch("/api/ficha-medica", {
        method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the fichaMedica state with the data from the backend
        setFichaMedica(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures the effect runs only once

  return (
    <main className="flex flex-col">
      <div>
        <NavBar />
      </div>
      <CartelDescripcion mensaje="Pagina para ver fichas medicas"/>
      <FichaMedica fichasMedicas={fichasMedicas} />
    </main>
  );
}
