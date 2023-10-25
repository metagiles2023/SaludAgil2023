import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Link from "next/link";

export default function Turnos() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-grow justify-center items-center">
                <Link href="/turnos/reservar-turno" className="btn_sacar_turno flex w-3/12 h-80 m-14 justify-center items-center bg-slate-200 px-14 rounded-[30px] shadow-2xl shadow-gray-600">
                    <img src="/lupa.svg" alt="Buscar turno" className="w-4/12" />
                    <div>
                        <h1 className="text-black text-center text-4xl font-bold">Reservar turno</h1>
                    </div>
                </Link>
                <Link href="/turnos/mis-turnos" className="btn_mis_turnos flex w-3/12 h-80 m-14 justify-center items-center bg-slate-200 px-14 rounded-[30px] shadow-2xl shadow-gray-600">
                    <img src="/calendario.svg" alt="Mis turnos" className="w-4/12" />
                    <div className="flex-grow">
                        <h1 className="text-black text-center text-4xl font-bold">Mis turnos</h1>
                    </div>
                </Link>
            </main>
            <Footer />
        </div>
    )
}