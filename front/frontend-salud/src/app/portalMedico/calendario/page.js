import Header from "@/components/Estructura/Header";
import Footer from "@/components/Estructura/Footer";
import Box from '@mui/material/Box';
import Calendario from "@/components/Calendario/Calendario";

export default function Turnos() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex justify-center items-center">
                <Calendario/>
                
            </main>
            <Footer />
        </div>
    )
}
/*
<div className="flex w-full h-[40vh]">
                    <CartaDia dia={""} />
                    <CartaDia dia={"1"} />
                    <CartaDia dia={"2"} />
                </div>
*/