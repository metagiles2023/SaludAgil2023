import Image from 'next/image'
<<<<<<< HEAD
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';
=======
import NavBar from '../../components/NavBar';
>>>>>>> turnos-merge-a-main

export default function Home() {
    return (
    <main className="flex flex-col">
        <div>
        <NavBar />
        {/* Rest of your homepage content */}
        </div>  
        <CartelDescripcion mensaje="Pagina principal de Salud Agil 2023"/>
    </main>
    )
}
