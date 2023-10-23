import Image from 'next/image'
import NavBar from '@/components/NavBar/NavBar';
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion';

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
