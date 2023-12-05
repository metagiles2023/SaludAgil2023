import Header from "@/components/Estructura/Header";
import Footer from "@/components/Estructura/Footer";
import Link from "next/link";

export default function Turnos() {
    return (
        <div className="flex flex-col min-h-screen">
            
            <main className="flex-1 flex justify-center items-center">
                <Link href="/portalMedico/cargarTurnos" className="btn_cargar_turno flex w-3/12 h-[40vh] m-14 gap-8 justify-center items-center bg-slate-200 px-14 rounded-[30px] shadow-2xl shadow-gray-600">
                    <img src="/sumar.svg" alt="Cargar turno" className="w-4/12" />
                    <div>
                        <h1 className="text-black text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">Cargar turnos</h1>
                    </div>
                </Link>
                <Link href="/portalMedico/calendario" className="btn_calendario_medico flex w-3/12 h-[40vh] m-14 gap-8 justify-center items-center bg-slate-200 px-14 rounded-[30px] shadow-2xl shadow-gray-600">
                    <img src="/calendario.svg" alt="Calendario medico" className="w-4/12" />
                    <div className="flex-grow">
                        <h1 className="text-black text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">Calendario</h1>
                    </div>
                </Link>
            </main>

        </div>
    )
}