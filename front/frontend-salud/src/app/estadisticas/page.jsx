"use client"
import Graficos from '@/components/Graficos/Graficos'
import { CartelDescripcion } from '@/components/carteles/CartelDescripcion'
import { useSession } from 'next-auth/react'; // Import useSession hook

export default function Home() {
    const { data: session } = useSession(); // useSession hook to get the current user

    if (session && session.user && session.user.usuario && 
        (session.user.usuario.rol == 'administrador' || session.user.usuario.rol == 'medico')) {
    return (
        <div className="flex flex-col min-h-screen">

            <main className='flex-1 flex justify-center items-center'>
                <div className='my-12'>
                    <Graficos></Graficos>
                </div>
            </main>

        </div>
    )} else {
        return (<div>
            <CartelDescripcion mensaje="Acceso no autorizado. Debe ser medico o administrador para ver esta pagina"/>
        </div>)
    }
}