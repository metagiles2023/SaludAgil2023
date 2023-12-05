"use client" //para que ejecute cosas en el cliente
import FormularioMultiple from '@/components/SeleccionMultiples/FormularioMultiple';
import NavBar from '@/components/NavBar/NavBar';
import Header from '@/components/Estructura/Header';
import Footer from '@/components/Estructura/Footer';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
import { Redireccionador } from '@/components/Redireccionador/Redireccionador';

export default function Home() {
    const selectedType = 'ficha-medica'

    return (
        <main className="flex flex-col">
            
            <FormularioMultiple formulario={selectedType} />
            <Redireccionador mensaje="Volver" ruta="/ficha-medica/ver"/>
            
        </main>
    );
}
