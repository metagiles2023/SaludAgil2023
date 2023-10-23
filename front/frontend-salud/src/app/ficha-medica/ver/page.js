"use client" //para que ejecute cosas en el cliente
import React, { useState, useEffect } from 'react';
import FichaMedica from '@/components/FichaMedica/FichaMedica';
import NavBar from '@/components/NavBar/NavBar';

export default function Home() {
  const [fichaMedica, setFichaMedica] = useState([]);

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <NavBar />
        {/* Rest of your homepage content */}
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Página para ver fichas médicas&nbsp;
        </p>
      </div>
      <FichaMedica fichaMedica={fichaMedica} />
    </main>
  );
}
