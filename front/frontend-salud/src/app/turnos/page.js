"use client"
import { CartelDescripcion } from "@/components/carteles/CartelDescripcion";
import Link from "next/link";
import { useSession } from 'next-auth/react'; // Import useSession hook

export default function Turnos() {
    const { data: session } = useSession(); // useSession hook to get the current user

    if (session && session.user && session.user.usuario) {

        return (
            <div className="flex flex-col min-h-screen">
            
            <main className="flex-1 flex justify-center items-center">
                <Link href="/turnos/reservarturnos" className="btn_sacar_turno flex w-3/12 h-[40vh] m-14 justify-center items-center bg-slate-200 px-14 rounded-[30px] shadow-2xl shadow-gray-600">
                    <img src="/lupa.svg" alt="Buscar turno" className="w-4/12" />
                    <div>
                        <h1 className="text-black text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">Reservar turno</h1>
                    </div>
                </Link>
                <Link href="/turnos/misturnos" className="btn_mis_turnos flex w-3/12 h-[40vh] m-14 justify-center items-center bg-slate-200 px-14 rounded-[30px] shadow-2xl shadow-gray-600">
                    <img src="/calendario.svg" alt="Mis turnos" className="w-4/12" />
                    <div className="flex-grow">
                        <h1 className="text-black text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">Mis turnos</h1>
                    </div>
                </Link>
            </main>
            
        </div>
    )
    } else {
        return (
            <div>
                <CartelDescripcion mensaje="Acceso no autorizado. Debe estar logueado para ver esta pagina."/>
            </div>
        )
    }
}